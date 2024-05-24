export default function Home() {

    function session(){
      // // localStorage.setItem("name", "test");
      // console.log(localStorage.getItem("name"));
    }

    return (
      <>
        <button onClick={() => session()}>TESTUJ</button>
      </>
    )
  }