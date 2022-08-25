function Example() {

    const array = ['dog', 'cat', 'cow', 'fish'];
    const list = array.map((item)=>{
      console.log(item);
     return <p key={item.toString()}>{item}</p>;
     
    });
  
    return (

        <div>{list}</div>

    )
  }
  
  export default Example