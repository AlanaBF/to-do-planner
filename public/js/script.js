$(".deleteMe").on("click", function(){
   $(this).closest("div").remove(); 
   const list = $(this).data("list")
   const item = $(this).data("item")
 fetch(`/${list}/${item}`, {method:"DELETE"})
 .then(response => {
    console.log(response)
 }).catch(error => {
    console.log(error)
 })
 });