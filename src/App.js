function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  const lis = props.topics.map((topic) => (
    <li key={topic.id}>
      <a
        id={topic.id}
        href={"/read/" + topic.id}
        onClick={(e) => {
          e.preventDefault();
          props.onChangeMode(e.target.id);
        }}
      >
        {topic.title}
      </a>
    </li>
  ));

  // const lis = [];
  // for (let i = 0; i < props.topics.length; i++) {
  //   const topic = props.topics[i];
  //   lis.push(
  //     <li key={topic.id}>
  //       <a href={"/read/" + topic.id}>{topic.title}</a>
  //     </li>
  //   );
  // }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function App() {
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ];
  return (
    <div>
      <Header
        title="REACT"
        onChangeMode={() => {
          alert("header!");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(id) => {
          alert(id);
        }}
      ></Nav>
      <Article title="Welcome" body="Hello, REACT!"></Article>
    </div>
  );
}

export default App;
