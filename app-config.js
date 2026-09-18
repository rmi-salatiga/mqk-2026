(function () {
    const config = window.MQK_SUPABASE_CONFIG || {
        url: 'https://wcdykrvaxcdkbpmdzdct.supabase.co',
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjZHlrcnZheGNka2JwbWR6ZGN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NTUwNzIsImV4cCI6MjEwNTIzMTA3Mn0.W4D7k-sEF2wMwvrqfSwLobb-gFUelIVnmJ8l_xJudsg'
    };

    config.links = config.links || {
        groupWhatsappUrl: '',
        juknisUrl: ''
    };
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
