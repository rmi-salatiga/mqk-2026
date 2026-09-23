(function () {
    const CONFIG_VERSION = '20260923.1';
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
