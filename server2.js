
 function data(){
    return new Promise ((resolve , reject)=>{
        fetch('http://localhost:3002/anitta')
            .then((response)=>{
                if(!response.ok){
                    reject('failed',response)
                }else{
                    resolve(response.json())
                }
            })
        .catch((error)=>{
            console.log('error : ',error)
        });
       
    })


}
data()

.then((datas)=>{
    console.log('datas : ',datas)
})
    

