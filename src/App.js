import { useState } from "react";

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
          // props.onChangeMode(e.target.id); // 이대로 사용하면 문자열이 된다.
          props.onChangeMode(Number(e.target.id));
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
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);

  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ];

  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, REACT!"></Article>;
  } else if (mode === "READ") {
    let title,
      body = null;

    topics.forEach((t) => {
      if (t.id === id) {
        title = t.title;
        body = t.body;
      }
    });
    content = <Article title={title} body={body}></Article>;
  }

  return (
    <div>
      <Header
        title="REACT"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(id) => {
          setMode("READ");
          setId(id);
        }}
      ></Nav>
      {content}
    </div>
  );
}

export default App;
