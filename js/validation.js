class Validation {
   static checkedAccount = false;
   static checkedStaffName = false;
   static checkedEmail = false;
   static checkedPassword = false;
   static checkedDay = true;
   static checkedSalary = false;
   static checkedPosition = false;
   static checkedHour = false;

   static showMessage(check, messageElement, message) {
      if (check) {
         messageElement.lastElementChild.style.display = "none";
      } else {
         messageElement.lastElementChild.style.display = "block";
      }
      messageElement.lastElementChild.innerText = message;
   }

   static isAccount() {
      const regex = /^\d+$/;
      const staffAccountElement = document.getElementById("tknv");
      const messageElement =
         staffAccountElement.closest(".form-group");

      // Khi input: input phải là số, nếu là chữ mới thông báo
      // độ dài lớn hơn quy định mới thông báo
      staffAccountElement.addEventListener("input", () => {
         if (
            staffAccountElement.value === "" ||
            (regex.test(staffAccountElement.value) &&
               staffAccountElement.value.length <= 6)
         ) {
            this.checkedAccount = true;
            this.showMessage(true, messageElement, "");
         } else {
            this.checkedAccount = false;
            this.showMessage(
               false,
               messageElement,
               "Tài khoản phải là 4 - 6 ký số"
            );
         }
      });

      // khi input là trống mới thông báo
      // độ dài bé hơn quy định mới thông báo
      staffAccountElement.addEventListener("blur", () => {
         if (
            this.checkedAccount &&
            staffAccountElement.value.length >= 4
         ) {
            this.checkedAccount = true;
            this.showMessage(true, messageElement, "");
         } else {
            this.checkedAccount = false;
            this.showMessage(
               false,
               messageElement,
               "Tài khoản phải là 4 - 6 ký số"
            );
         }
      });
   }

   static isStaffName() {
      const regex =
         /^[a-zA-Z _ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/;
      const staffNameElement = document.getElementById("name");
      const messageElement = staffNameElement.closest(".form-group");

      staffNameElement.addEventListener("input", () => {
         if (
            regex.test(staffNameElement.value) ||
            staffNameElement.value === ""
         ) {
            this.checkedStaffName = true;
            this.showMessage(true, messageElement, "");
         } else {
            this.checkedStaffName = false;
            this.showMessage(
               false,
               messageElement,
               "Tên nhân viên phải là chữ"
            );
         }
      });
      staffNameElement.addEventListener("blur", () => {
         if (
            this.checkedStaffName &&
            staffNameElement.value.trim() !== ""
         ) {
            this.checkedStaffName = true;
            this.showMessage(true, messageElement, "");
         } else {
            this.checkedStaffName = false;
            this.showMessage(
               false,
               messageElement,
               "Không được để trống"
            );
         }
      });
   }

   static isEmail() {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const staffEmailElement = document.getElementById("email");
      const messageElement = staffEmailElement.closest(".form-group");

      staffEmailElement.addEventListener("input", () => {
         this.checkedEmail = true;
         this.showMessage(true, messageElement, "");
      });

      staffEmailElement.addEventListener("blur", () => {
         if (regex.test(staffEmailElement.value)) {
            this.checkedEmail = true;
            this.showMessage(true, messageElement, "");
         } else {
            this.checkedEmail = false;
            this.showMessage(
               false,
               messageElement,
               staffEmailElement.value.trim() === ""
                  ? "Không được để trống"
                  : "Email phải đúng định dạng"
            );
         }
      });
   }

   static isPassword() {
      const regex =
         /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
      const staffPasswordElement =
         document.getElementById("password");
      const messageElement =
         staffPasswordElement.closest(".form-group");

      staffPasswordElement.addEventListener("input", () => {
         this.checkedPassword = true;
         this.showMessage(true, messageElement, "");
      });

      staffPasswordElement.addEventListener("blur", () => {
         if (
            regex.test(staffPasswordElement.value) &&
            staffPasswordElement.value.length >= 6 &&
            staffPasswordElement.value.length <= 10
         ) {
            this.checkedPassword = true;
            this.showMessage(true, messageElement, "");
         } else {
            this.checkedPassword = false;
            this.showMessage(
               false,
               messageElement,
               "Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
            );
         }
      });
   }

   static isDay() {
      const regex =
         /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
      const staffDayElement = document.getElementById("datepicker");
      const messageElement = staffDayElement.closest(".form-group");

      staffDayElement.addEventListener("input", () => {
         this.checkedDay = true;
         this.showMessage(true, messageElement, "");
      });

      staffDayElement.addEventListener("blur", () => {
         if (regex.test(staffDayElement.value)) {
            this.checkedDay = true;
            this.showMessage(true, messageElement, "");
         } else {
            this.checkedDay = false;
            this.showMessage(
               false,
               messageElement,
               staffDayElement.value === ""
                  ? "Không được để trống"
                  : "Ngày làm không để trống, định dạng mm/dd/yyyy"
            );
         }
      });
   }

   static isSalary() {
      const regex = /^\d+$/;
      const staffSalaryElement = document.getElementById("luongCB");
      const messageElement =
         staffSalaryElement.closest(".form-group");
      staffSalaryElement.addEventListener("input", () => {
         if (
            regex.test(staffSalaryElement.value) ||
            staffSalaryElement.value === ""
         ) {
            this.checkedSalary = true;
            this.showMessage(true, messageElement, "");
         } else {
            this.checkedSalary = false;
            this.showMessage(
               false,
               messageElement,
               "Lương phải là số"
            );
         }
      });

      staffSalaryElement.addEventListener("blur", () => {
         if (
            this.checkedSalary &&
            Number(staffSalaryElement.value) >= 1000000 &&
            Number(staffSalaryElement.value) <= 20000000
         ) {
            this.checkedSalary = true;
            this.showMessage(true, messageElement, "");
         } else {
            this.checkedSalary = false;
            this.showMessage(
               false,
               messageElement,
               staffSalaryElement.value === ""
                  ? "Không được để trống"
                  : "Lương phải lớn hơn 1.000.000 và nhỏ hơn 20.000.000"
            );
         }
      });
   }

   static isPosition() {
      const positionStaffElement = document.getElementById("chucvu");
      const messageElement =
         positionStaffElement.closest(".form-group");
      positionStaffElement.addEventListener("change", () => {
         if (positionStaffElement.selectedIndex !== 0) {
            this.checkedPosition = true;
            this.showMessage(true, messageElement, "");
         } else {
            this.checkedPosition = false;
            this.showMessage(
               false,
               messageElement,
               "Vui lòng chọn chức vụ"
            );
         }
      });
   }

   static isHour() {
      const regex = /^\d+$/;
      const staffHourElement = document.getElementById("gioLam");
      const messageElement = staffHourElement.closest(".form-group");
      staffHourElement.addEventListener("input", () => {
         if (
            regex.test(staffHourElement.value) ||
            staffHourElement.value === ""
         ) {
            this.checkedHour = true;
            this.showMessage(true, messageElement, "");
         } else {
            this.checkedHour = false;
            this.showMessage(false, messageElement, "Giờ phải là số");
         }
      });

      staffHourElement.addEventListener("blur", () => {
         if (
            this.checkedHour &&
            Number(staffHourElement.value) >= 80 &&
            Number(staffHourElement.value) <= 200
         ) {
            this.checkedHour = true;
            this.showMessage(true, messageElement, "");
         } else {
            this.checkedHour = false;
            this.showMessage(
               false,
               messageElement,
               staffHourElement.value === ""
                  ? "Không được để trống"
                  : "Giờ phải lớn hơn 80 và nhỏ hơn 200"
            );
         }
      });
   }

   static resetInput() {
      document.getElementById("tknv").value = "";
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("luongCB").value = "";
      document.getElementById("chucvu").selectedIndex = 0;
      document.getElementById("gioLam").value = "";
   }

   static resetValidation() {
      this.checkedAccount = false;
      this.checkedStaffName = false;
      this.checkedEmail = false;
      this.checkedPassword = false;
      this.checkedDay = true;
      this.checkedSalary = false;
      this.checkedPosition = false;
      this.checkedHour = false;
   }

   static validate() {
      if (
         this.checkedAccount &&
         this.checkedStaffName &&
         this.checkedEmail &&
         this.checkedPassword &&
         this.checkedDay &&
         this.checkedSalary &&
         this.checkedPosition &&
         this.checkedHour
      ) {
         const user = {
            account: document.getElementById("tknv").value,
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            // password: document.getElementById("password").value,
            day: document.getElementById("datepicker").value,
            salary: document.getElementById("luongCB").value,
            position: document.getElementById("chucvu").value,
            hour: document.getElementById("gioLam").value,
         };
         // this.resetInput();
         return user;
      } else {
         const formElement = document.querySelector("form");
         const inputElements = formElement.querySelectorAll("input");
         const selectElement = formElement.querySelector("select");
         inputElements.forEach((element) => {
            if (element.value.trim() === "") {
               element.closest(
                  ".input-group"
               ).nextElementSibling.innerText = "Không được để trống";
               element.closest(
                  ".input-group"
               ).nextElementSibling.style.display = "block";
            }
         });
         if (selectElement.selectedIndex === 0) {
            selectElement.closest(
               ".input-group"
            ).nextElementSibling.innerText = "Không được để trống";
            selectElement.closest(
               ".input-group"
            ).nextElementSibling.style.display = "block";
         }
      }
   }
}
