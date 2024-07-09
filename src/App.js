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

function Create(props) {
  // let error = null;
  const [error, setError] = useState(null);
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const body = e.target.body.value;
          if (title === "" || body === "") {
            // alert("タイトルと本文を入力してください。");
            // error = <p>タイトルと本文を入力してください。</p>;
            setError(<p style={{ color: "red", fontWeight: "bold" }}>タイトルと本文を入力してください。</p>);
            console.log(error);
          } else {
            props.onCreate(title, body);
          }
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title"></input>
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="create"></input>
        </p>
        {error}
      </form>
    </article>
  );
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const _title = e.target.title.value;
          const _body = e.target.body.value;
          props.onUpdate(_title, _body);
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="create"></input>
        </p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4); // 1,2,3은 이미 사용중이므로 4부터 시작

  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ]);

  let content = null;
  let contextControl = null;
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
    contextControl = (
      <>
        <li>
          {" "}
          <a
            href={"/update/" + id}
            onClick={(e) => {
              e.preventDefault();
              setMode("UPDATE");
            }}
          >
            UPDATE
          </a>
        </li>
        <li>
          <input
            type="button"
            value="delete"
            onClick={() => {
              const newTopics = topics.filter((t) => t.id !== id);
              setTopics(newTopics);
              setMode("WELCOME");
            }}
          ></input>
        </li>
      </>
    );
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newTopic = { id: nextId, title: _title, body: _body };
          setTopics([...topics, newTopic]);

          setId(nextId); // id를 현재 생성한 id로 설정
          setMode("READ"); // 생성한 글을 바로 읽기 모드로 전환

          setNextId(nextId + 1); // 다음 생성할 id를 설정
        }}
      ></Create>
    );
  } else if (mode === "UPDATE") {
    let title,
      body = null;

    topics.forEach((t) => {
      if (t.id === id) {
        title = t.title;
        body = t.body;
      }
    });
    content = (
      <Update
        title={title}
        body={body}
        onUpdate={(_title, _body) => {
          const newTopics = topics.map((t) => {
            if (t.id === id) {
              return { id: id, title: _title, body: _body };
            }
            return t;
          });
          setTopics(newTopics);
          setMode("READ");
        }}
      ></Update>
    );
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
      <ul>
        <li>
          <a
            href="/create"
            onClick={(e) => {
              e.preventDefault();
              setMode("CREATE");
            }}
          >
            Create
          </a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
