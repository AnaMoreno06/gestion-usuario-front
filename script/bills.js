function saveBills(){
    let valor=document.getElementById('inputValor').value
    let tipo=document.getElementById('selectTipo').value
    let observation=document.getElementById('inputObservacion').value
    let user_id=sessionStorage.getItem('id')
    const fecha =new Date()

    const newBills={
        
        user_id,
        value:valor,
        type:tipo,
        observation,
        date_bill:fecha
    }
    let username=sessionStorage.getItem("username")
    
    fetch('http://localhost:8080/users/'+username+'/bills',{
        method:'POST',
        body:JSON.stringify(newBills),
        headers:{
            "Content-type":"application/json"
        }
    })
    .then(response=>response.json())
    .then(newBills=>{
        console.log("NEW BILLS "+newBills)
        Swal.fire({
            icon: 'success',
            title: 'Movimiento Guardado ',
            text: username,
            timer: 1000,
            footer: '<p class="fw-bolder" >King Shoes CO</p>'
          })
          setTimeout(recargar,1000)
        
        

    })
    .catch(err=>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error guardar movimiento!',
            timer:1000,
            footer: '<a href="">Why do I have this issue?</a>'
        })
    })
 

}
function deleteBills(id){
    
    let username=sessionStorage.getItem("username")
    
    fetch('http://localhost:8080/users/'+username+'/bills/'+id,{
        method:'DELETE',
        headers:{
            "Content-type":"application/json"
        }
    })
    .then(response=>response.json())
    .then(data=>{
        Swal.fire({
            icon: 'success',
            title: 'Movimiento Eliminado',
            text: username,
            timer: 1000,
            footer: '<p class="fw-bolder" >King Shoes CO</p>'
          })

          setTimeout(recargar,1000)
        

    })
    .catch(err=>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo eliminar movimiento!',
            timer:1000,
            footer: '<a href="">Why do I have this issue?</a>'
        })
    })

}