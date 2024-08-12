//configuracion base para los toasts
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000
});

//funcion para mostrar una alerta de exito
export const showSuccessToast = (message) => {
    Toast.fire({
        icon: 'success',
        title: message
    });
};

//funcion para mostrar una alerta de informacion
export const showInfoToast = (message) => {
    Toast.fire({
        icon: 'info',
        title: message
    });
};

//funcion para mostrar una alerta de error
export const showErrorToast = (message) => {
    Toast.fire({
        icon: 'error',
        title: message
    });
};

//funcion para mostrar una alerta de advertencia
export const showWarningToast = (message) => {
    Toast.fire({
        icon: 'warning',
        title: message
    });
};

//funcion para mostrar una alerta de pregunta
export const showQuestionToast = (message) => {
    Toast.fire({
        icon: 'question',
        title: message
    });
};
