import Swal from "sweetalert2";

export const showAlert = (type, title, text) => {
  Swal.fire({
    icon: type, // "success", "error", "warning", "info", "question"
    title: title,
    text: text,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  });
};

export const showToast = (type, message) => {
  Swal.fire({
    icon: type, // "success", "error", "warning", "info"
    title: message,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};
