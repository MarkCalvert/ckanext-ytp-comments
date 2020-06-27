function ShowCommentForm(id) {
    $("#" + id).removeClass('hidden');
}

jQuery(document).ready(function () {

    jQuery('.comment-container form .btn-cancel').on('click', function (e) {
        var form = jQuery(this).closest('form');
        if (form) {
            form.addClass('hidden');
        }
    });

    if (window.location.search) {
        let params = new URLSearchParams(window.location.search);
        // If parameter exists, highlight the comment sections from the list of comment_ids provided
        if (params.has('comment_ids')) {
            comment_ids = params.get('comment_ids')
            comment_ids.split(',').forEach(id => {
                jQuery('#comment_' + id).addClass('highlight');
            });
        }
    }

});