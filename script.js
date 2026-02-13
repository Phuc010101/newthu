$(document).ready(function () {
    const envelope = $('#envelope');
    const openBtn = $('#openBtn');
    const resetBtn = $('#resetBtn');
    const audio = document.getElementById('sound');

    let currentPage = 1;
    const totalPages = 23;
    let isOpen = false;
    let hasPlayed = false;

    function playAudioOnce() {
        if (!hasPlayed) {
            audio.play().then(() => {
                hasPlayed = true;
            }).catch(() => {});
        }
    }

    function updateActivePage() {
        $('.lyric-page').removeClass('active');
        $('#page' + currentPage).addClass('active');
    }

    // Nút MỞ / TIẾP
    openBtn.on('click', function () {
        playAudioOnce();

        // Nếu thư đang đóng → mở thư
        if (!isOpen) {
            envelope.removeClass('close').addClass('open');
            isOpen = true;
            currentPage = 1;
            updateActivePage();
            resetBtn.show();
            return;
        }

        // Nếu đã mở và CHƯA phải trang cuối → sang trang tiếp theo
        if (currentPage < totalPages) {
            currentPage++;
            updateActivePage();
        }
        // Nếu là trang cuối → không làm gì cả (dừng)
    });

    // Nút ĐÓNG
    resetBtn.on('click', function () {
        envelope.removeClass('open').addClass('close');
        isOpen = false;
        currentPage = 1;
        updateActivePage();
        resetBtn.hide();
    });
});
