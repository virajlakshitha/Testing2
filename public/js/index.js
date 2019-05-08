/* * * * *     Global Variables     * * * * */
let BASE_URL_LOCAL = 'http://localhost:3001';
let BASE_URL_PROD = '';


/* * * * *     Headers for cross origin issues   * * * * */
let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
};

$('.newPost button[data-func]').click(function() {
    document.execCommand($(this).data('func'), false);
});

$('.newPost select[data-func]').change(function() {
    var $value = $(this).find(':selected').val();
    document.execCommand($(this).data('func'), false, $value);
});

if (typeof(Storage) !== "undefined") {

    $('.editor').keypress(function() {
        $(this).find('.saved').detach();
    });
    $('.editor').html(localStorage.getItem("wysiwyg"));

    $('button[data-func="save"]').click(function() {
		if($('#techTitle').val() == ''){
			$.notify("Please add post Title", "error");
			return;
		}
		if($('.editor').html() == ''){
			$.notify("Post Content Cannot Be Empty", "error");
			return;
		}
		
		if(document.getElementById('postedOn').value == ''){
			$.notify("Please set Posted date", "error");
			return;
        }
        if(document.getElementById('category').value == ''){
			$.notify("Please select the category", "error");
			return;
		}
        $content = $('.editor').html();
        localStorage.setItem("wysiwyg", $content);
        insertPost();

    });

    $('button[data-func="clear"]').click(function() {
        $('.editor').html('');
        localStorage.removeItem("wysiwyg");
    });


}

function insertPost() {
    let data = {
        techName: document.getElementById('techTitle').value,
        details: $('.editor').html(),
        category: document.getElementById('category').value,
        iconUrl: document.getElementById('iconUrl').value,
		postedOn: document.getElementById('postedOn').value
    }

    axios.post(BASE_URL_LOCAL + '/tech/', data)
        .then(response => {
            if (response.data.status) {
                console.log(response);
                $('.editor').append('<span class="saved"><i class="fa fa-check"></i></span>').fadeIn(function() {
                    $(this).find('.saved').fadeOut(500);
                });
                if (response.data.message != undefined) {
                    console.log(response.data.message);
                    $.notify(response.data.message, "success");
                }
            } else {
                $.notify("Post Not Submitted", "error");
            }
        }).catch(error => {
            console.log(error);
            $.notify(error, "error");
        })

}