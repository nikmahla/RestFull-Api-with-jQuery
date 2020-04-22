
const getUsers = () => {
    const apiUrl = 'https://jsonplaceholder.ir/users';
    $.get(apiUrl, function (data) {

        for (let i = 0; i < data.length; i++) {
            const user = data[i];
            const option = `<option value ="${user.id}" >  ${user.name} </option> `;
            $("#optionUser").append(option);

        }
    })

}

const getPost = () => {
    $('#tbodyTable').html('');
    $('#iconSpiner').removeClass('hide');
    const userId = $("#optionUser").val();

    try {
        const apiUrl = `https://jsonplaceholder.ir/posts?userId=${userId}`;
        $.get(apiUrl, function (data) {
            for (let i = 0; i < data.length; i++) {
                const posts = data[i];
                const tr = `
            <tr>
            <td>${posts.id}</td>
            <td>${posts.title}</td>
            <td>${posts.body}</td>
            <td> <button onclick="showComments(this,${posts.id}) " class="btn btn-outline-success"> نظرات </button></td>
        </tr>`;
                $('#tbodyTable').append(tr);
            }

            $('#iconSpiner').addClass('hide');
        })

    } catch (error) {
        $('#iconSpiner').addClass('hide');
        alert('Data load error');
    }

}

const showComments = (element, postId) => {
    $('.modal-body').html('');
    let div = '';
    const ApiUrl = `https://jsonplaceholder.ir/comments?postId=${postId}`;
    $.get(ApiUrl, function (data) {
        for (let i = 0; i < data.length; i++) {
            const comments = data[i];
            div += `<div class="m-2  text-justify"> <b> ${comments.name} </b> : ${comments.body}  
                 </div>`;
        }

        $('.modal-body').append(div);
        $('#userModal').modal();

    })

    // $('#posts #tbodyTable tr.comments').remove();

    // const commentsDiv = $(element).parents('tr').next();
    // if ($(commentsDiv).hasClass('comments')) {
    //     $(commentsDiv).remove();
    //     return;
    //     
    // }

    // const ApiUrl = `https://jsonplaceholder.ir/comments?postId=${postId}`;

    // let div = '';
    // $.get(ApiUrl, function (data) {
    //     for (let i = 0; i < data.length; i++) {
    //         const comments = data[i];
    //          div += `<div> <b> ${comments.name} </b> : ${comments.body}  
    //          </div>`;


    //     }
    //      const newRow = $(`<tr class="comments bg-gray text-dark">
    //      <td colspan="4 ">${div}</td>
    //      </tr>`);
    //      newRow.insertAfter($(element).parents('tr'));

    // })



}

