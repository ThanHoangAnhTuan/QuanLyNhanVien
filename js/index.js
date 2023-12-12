let arrayStaffs = [];

function showStaffs() {
   if (localStorage.getItem("staffs")) {
      arrayStaffs = JSON.parse(localStorage.getItem("staffs"));
      renderStaffs(arrayStaffs);
   }
}

showStaffs();

function addStaff() {
   Validation.isAccount();
   Validation.isStaffName();
   Validation.isEmail();
   Validation.isPassword();
   Validation.isDay();
   Validation.isSalary();
   Validation.isPosition();
   Validation.isHour();
}

addStaff();

const addStaffButtonElement = document.getElementById("btnThemNV");
addStaffButtonElement.addEventListener("click", () => {
   const staff = Validation.validate();
   const messageErrorElement = document
      .getElementById("tknv")
      .closest(".form-group");
   if (staff) {
      let flag = true;
      for (let i = 0; i < arrayStaffs.length; i++) {
         if (arrayStaffs[i].account === staff.account) {
            Validation.showMessage(
               false,
               messageErrorElement,
               "Tài khoản đã tồn tại"
            );
            flag = false;
            break;
         }
      }
      if (flag) {
         Validation.resetValidation();
         arrayStaffs.push(staff);
         renderStaffs([staff]);
         saveStaffs();
         Validation.resetInput();
      }
   }
});

function renderStaffs(arrayStaffs) {
   arrayStaffs.forEach((staff) => {
      const tableStaffs = document.getElementById("tableDanhSach");
      let trElement = document.createElement("tr");
      const total = totalSalary(staff?.position, staff.salary);
      const rating = staffRating(staff.hour);
      trElement.innerHTML = `<td>${staff.account}</td>
                              <td>${staff.name}</td>
                              <td>${staff.email}</td>
                              <td>${staff.day}</td>
                              <td>${staff.position}</td>
                              <td>${total}</td>
                              <td>${rating}</td>
                              <td class= "btnRemove"><i class="fa-solid fa-xmark"></i></td>`;
      tableStaffs.append(trElement);
   });
}

function removeStaffs() {
   const tableStaffs = document.getElementById("tableDanhSach");
   while (tableStaffs.hasChildNodes()) {
      tableStaffs.firstElementChild.remove();
   }
}

function totalSalary(staffPosition, staffSalary) {
   switch (staffPosition) {
      case "Sếp":
         staffSalary = staffSalary * 3;
         break;
      case "Trường phòng":
         staffSalary = staffSalary * 2;
         break;
      case "Nhân viên":
         staffSalary = staffSalary * 1;
         break;
      default:
         break;
   }
   return Number(staffSalary).toLocaleString("vn-VN");
}

function staffRating(staffHour) {
   if (staffHour >= 192) {
      return "Nhân viên xuất sắc";
   } else if (staffHour >= 176) {
      return "Nhân viên giỏi";
   } else if (staffHour >= 160) {
      return "Nhân viên khá";
   } else {
      return "Nhân viên trung bình";
   }
}

function saveStaffs() {
   localStorage.setItem("staffs", JSON.stringify(arrayStaffs));
}

const tableStaffs = document.getElementById("tableDanhSach");
tableStaffs.addEventListener("click", (event) => {
   if (event.target.tagName === "I") {
      if (confirm("Bạn thực sự muốn xóa nhân viên này?")) {
         event.target.parentElement.parentElement.remove();

         arrayStaffs = arrayStaffs.filter((staff) => {
            return (
               staff.account !==
               event.target.parentElement.parentElement
                  .firstElementChild.innerText
            );
         });
         saveStaffs(arrayStaffs);
      }
   }
});

const btnCapNhat = document.getElementById("btnCapNhat");
btnCapNhat.addEventListener("click", () => {
   const staff = Validation.validate();
   const messageErrorElement = document
      .getElementById("tknv")
      .closest(".form-group");
   if (staff) {
      let flag = false;
      for (let i = 0; i < arrayStaffs.length; i++) {
         if (arrayStaffs[i].account === staff.account) {
            arrayStaffs[i] = staff;
            flag = true;
            Validation.resetValidation();
            removeStaffs();
            renderStaffs(arrayStaffs);
            saveStaffs();
            Validation.resetInput();
            break;
         }
      }
      if (!flag) {
         Validation.showMessage(
            false,
            messageErrorElement,
            "Tài khoản chưa tồn tại"
         );
      } else {
         Validation.showMessage(true, messageErrorElement, "");
      }
   }
});

const searchName = document.getElementById("searchName");
searchName.addEventListener("change", (event) => {
   let result = arrayStaffs.filter((staff) => {
      let rating = staffRating(staff.hour);
      if (
         rating
            .toLocaleLowerCase()
            .includes(searchName.value.toLocaleLowerCase())
      ) {
         return staff;
      }
   });
   removeStaffs();
   renderStaffs(result);
});
