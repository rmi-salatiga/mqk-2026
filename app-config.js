(function () {
    const CONFIG_VERSION = '20260927.3';
    const config = window.MQK_SUPABASE_CONFIG || {
        url: 'https://wcdykrvaxcdkbpmdzdct.supabase.co',
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjZHlrcnZheGNka2JwbWR6ZGN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NTUwNzIsImV4cCI6MjEwNTIzMTA3Mn0.W4D7k-sEF2wMwvrqfSwLobb-gFUelIVnmJ8l_xJudsg'
    };

    config.links = config.links || {
        groupWhatsappUrl: 'https://chat.whatsapp.com/DzjmLbJ2EbB5pm0uJmMEFG',
        juknisUrl: 'https://drive.google.com/file/d/17DMEeC2uqcNBXt39qt_k7J0qSaycmtss/view?usp=sharing'
    };
    config.competitionDate = config.competitionDate || '2026-10-11';
    config.event = config.event || {
        dateLabel: '11 Oktober 2026',
        ageLabel: '11 Okt 2026',
        venue: 'PP Agro Nur El Falah'
    };
    config.version = CONFIG_VERSION;
    window.MQK_SUPABASE_CONFIG = config;

    window.calculateMqkAge = function (birthDate) {
        const birthParts = String(birthDate || '').split('-').map(Number);
        const eventParts = String(config.competitionDate || '').split('-').map(Number);
        if (birthParts.length !== 3 || eventParts.length !== 3 || [...birthParts, ...eventParts].some(part => !Number.isInteger(part) || part < 1)) {
            return NaN;
        }
        const validDate = parts => {
            const [year, month, day] = parts;
            const date = new Date(Date.UTC(year, month - 1, day));
            return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
        };
        if (!validDate(birthParts) || !validDate(eventParts)) return NaN;
        let age = eventParts[0] - birthParts[0];
        if (eventParts[1] < birthParts[1] || (eventParts[1] === birthParts[1] && eventParts[2] < birthParts[2])) {
            age--;
        }
        return age;
    };

    window.validateMqkAge = function (birthDate, category) {
        const age = window.calculateMqkAge(birthDate);
        let limit = null;
        if (/\(Ulya\s*-/.test(category || '')) limit = 24;
        else if (/\(Wustho\s*-/.test(category || '')) limit = 19;
        else if (/\(Ula\s*-/.test(category || '')) limit = 17;
        let latestEligibleBirthDate = null;
        let meetsDateCutoff = true;
        if (limit !== null) {
            const [eventYear, eventMonth, eventDay] = String(config.competitionDate).split('-').map(Number);
            latestEligibleBirthDate = `${String(eventYear - limit).padStart(4, '0')}-${String(eventMonth).padStart(2, '0')}-${String(eventDay).padStart(2, '0')}`;
            meetsDateCutoff = String(birthDate || '') > latestEligibleBirthDate;
        }
        return {
            age,
            limit,
            latestEligibleBirthDate,
            valid: Number.isFinite(age) && (limit === null || (age < limit && meetsDateCutoff))
        };
    };

    window.withMqkPhotoCacheBust = function (imageUrl) {
        if (!imageUrl) return '';
        const url = new URL(imageUrl, window.location.href);
        url.searchParams.set('mqk_refresh', String(Date.now()));
        return url.toString();
    };

    window.createMqkSupabase = function () {
        if (!config.url || !config.anonKey || config.anonKey === '******') {
            throw new Error('Konfigurasi Supabase belum lengkap. Isi anon key publik di app-config.js.');
        }
        return supabase.createClient(config.url, config.anonKey);
    };

    window.requireMqkRole = function (role) {
        if (localStorage.getItem('role') !== role) {
            window.location.replace('index.html');
            return false;
        }
        return true;
    };
})();
