import Swal from 'sweetalert2';


export function infoSent() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Task saved!'
    })
  }
 

  export function taskDeleted() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: 'Task deleted!'
    })
  }

  export function taskEdited() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'info',
      title: 'Task edited!'
    })
  }
 
 
export function confirmationAlert(){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success btn-with-margin',
          cancelButton: 'btn btn-danger btn-with-margin'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            taskDeleted()
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      })
}
