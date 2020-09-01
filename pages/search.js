export default () => {

  return(<div>

    <header>
   <img src="https://i0.wp.com/www.studentdoctor.net/wp-content/uploads/2019/03/shutterstock_582888679.png?fit=1200%2C627&ssl=1" alt="Five developers at work."/>
   <section class='hero-header-text'>
      <h1>Ellen Macpherson</h1>
      <h2>Just another tech blog.</h2>
      <button>Read more.</button>
   </section>
</header>

    <style jsx>{`
      header {
    height: 600px;
    width: 100vw;
    background: black;
    overflow: hidden;
}

img {
   object-fit: cover;
   opacity: 0.4;
}

      `}</style>

    </div>

  )
}
