const getEle = (id) => document.getElementById(id)

export class Validation {
    kiemTraRong = (input, divId, mess) => {
        //Đúng
        if (input.trim()) {
            getEle(divId).innerHTML = "";
            return true;
        }
        //Sai
        getEle(divId).innerHTML = mess;
        return false;
    };

    kiemTraTrung = (input, divId, mess, list) => {
        let index = list.findIndex(task => task.newTask === input.trim())
        if (index !== -1) {
            getEle(divId).innerHTML = mess;
            return false;
        }
        getEle(divId).innerHTML = "";
        return true;
    };

    kiemTraChu = (input, divId, mess) => {
        let letter =
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        //Đúng    
        if (input.match(letter)) {
            getEle(divId).innerHTML = "";
            return true;
        }
        //Sai
        getEle(divId).innerHTML = mess;
        return false;
    };
}