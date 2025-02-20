import Swal from "sweetalert2";

export const showToast = async (icon, title, position = "top-end") => {
  const Toast = Swal.mixin({
    toast: true,
    position: position,
    background:
      icon === "error"
        ? "#f27474"
        : icon === "warning"
        ? "#ff9d00"
        : icon === "success"
        ? "#4ade80"
        : "#fffff",
    iconColor: "white",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });
  return await Toast.fire({
    icon,
    title,
    color: "white",
    animation: true,
  });
};
