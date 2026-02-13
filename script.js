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

        // Nếu là trang cuối → thêm nút trái tim
        if (currentPage === totalPages) {
            if ($('#heartBtn').length === 0) {
                $('#page' + totalPages).append(`
                    <div style="margin-top:15px;">
                        <a id="heartBtn" 
                           href="https://website-text-color-u-b4x3.bolt.host/" 
                           target="_blank"
                           style="
                               display:inline-block;
                               padding:10px 20px;
                               background:#ff6b9a;
                               color:white;
                               border-radius:20px;
                               text-decoration:none;
                               font-weight:bold;
                           ">
                           ❤️ Nhấn vào tim nè ❤️
                        </a>
                    </div>
                `);
            }
        }
    }

    openBtn.on('click', function () {
        playAudioOnce();

        // Nếu thư đang đóng → mở thư
        if (!isOpen) {
            envelope.removeClass('close').addClass('open');
            isOpen = true;
            currentPage = 1;
            updateActivePage();
            resetBtn.show();

            // Đổi chữ nút thành "Tiếp"
            openBtn.text("Tiếp");
            return;
        }

        // Nếu chưa tới trang cuối → sang trang tiếp theo
        if (currentPage < totalPages) {
            currentPage++;
            updateActivePage();
        } else {
    // Nếu đang ở trang cuối → chuyển sang link khác
            window.location.href = "https://website-text-color-u-b4x3.bolt.host/";
}
    });

    // Nút ĐÓNG
    resetBtn.on('click', function () {
        envelope.removeClass('open').addClass('close');
        isOpen = false;
        currentPage = 1;
        updateActivePage();
        resetBtn.hide();

        // Đổi lại chữ nút thành "Mở"
        openBtn.text("Mở");

        // Xóa nút trái tim nếu có
        $('#heartBtn').remove();
    });
});
