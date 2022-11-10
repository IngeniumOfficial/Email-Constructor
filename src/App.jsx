import { createSignal, For, createEffect, Show, Switch, Match, createMemo } from 'solid-js';
import './App.scss';

export default function App() {
  const [inputCount, setInputCount] = createSignal([]);
  const [details, setDetails] = createSignal({});
  const [submitted, setSubmitted] = createSignal([]); // Make sure to only bulk update this
  const [dataShow, setDataShow] = createSignal(true);
  const [dataSmallShow, setDataSmallShow] = createSignal(false);

  const [newLayout, setNewLayout] = createSignal(window.innerWidth); // 'regular', 'small', 'phone'

  const handleAdd = () => {
    setInputCount(prev => [...prev, '1']);
    setDetails((prevD) => {
      const obj = {...prevD};
      const newCount = inputCount().length;
      obj[newCount] = {'firstname': '', 'lastname': '', 'website': ''};
      return obj;
    });
  }

  const handleRemove = () => {
    setInputCount(prev => [...prev].slice(1));
    setDetails((prevD) => {
      const obj = {...prevD};
      const toRemove = inputCount().length+1;
      delete obj[toRemove];
      return obj;
    })
  }


  const handleSubmit = () => {
    const arr = [];
    const obj = {...details()};
    for(let prop in obj){
      const f = obj[prop]['firstname'];
      const l = obj[prop]['lastname'];
      const tw = obj[prop]['website'];
      const w = '@'+tw;
      arr.push(f+w);
      arr.push(l+w);
      arr.push(f+l+w);
      arr.push(f+'.'+l+w);
      arr.push(f[0]+l+w);
      arr.push(f+l[0]+w);
      arr.push(f+'.'+l[0]+w);
      arr.push(f[0]+l[0]+w);
      arr.push(f[0]+'.'+l[0]+w);
      arr.push(l+f+w);
      arr.push(l+'.'+f+w);
      arr.push(l+f[0]+w);
      arr.push(l+'.'+f[0]+w);
      arr.push(l[0]+f+w);
      arr.push(l[0]+'.'+f+w);
      arr.push(l[0]+f[0]+w);
      arr.push(l[0]+'.'+f[0]+w);
      arr.push(f+'-'+l+w);
      arr.push(f[0]+'-'+l+w);
      arr.push(f+'-'+l[0]+w);
      arr.push(f[0]+'-'+l[0]+w);
      arr.push(l+'-'+f+w);
      arr.push(l+'-'+f[0]+w);
      arr.push(f[0]+'-'+l+w);
      arr.push(f[0]+'-'+l[0]);
      arr.push(f+'_'+l+w);
      arr.push(f[0]+'_'+l+w);
      arr.push(l+'_'+f[0]+w);
      arr.push(l[0]+'_'+f[0]+w);
      arr.push(l+'_'+f+w);
      arr.push(l+'_'+f[0]+w);
      arr.push(l[0]+'_'+f+w);
      arr.push(l[0]+'_'+f[0]+w);
    }
    setSubmitted(arr);
  }



  return (
    <Switch>
      <Match when={newLayout() >= 901}>
        <div id='app' >
          <div id='header'>
            <h2>Email Constructor</h2>
          </div>
          <div id='detailsInput'>
            <For each={inputCount()}>{(input, index) =>
              <InputDetails idd={index()+1} setInputCount={setInputCount()} setDetails={setDetails} details={details()} />
            }</For>
            <button onClick={handleAdd}>Add An Input</button>
            <button onClick={handleRemove}>Remove An Input</button>
            <br></br>
            <button id='submit' onClick={handleSubmit}>Submit</button>
            <Show when={dataShow()} fallback={
              <>
                <br></br>
                <button onClick={() => setDataShow(prev => !prev)}>Show</button>
              </>
            }>
              <br></br>
              <button onClick={() => setDataShow(prev => !prev)}>Hide</button>
              <br></br>
              <textarea readonly id='data'>
                {JSON.stringify(details(), null, 2)}
              </textarea>
            </Show>
          </div>
          <div id='generatedListOutput'>
            <textarea id='output'>
              {submitted().map((el) => {
                return el+'\n';
              })}
            </textarea>
          </div>
        </div>
      </Match>
      <Match when={newLayout() <= 900}>
      <div id='app' >
          <div id='header'>
            <h2>Email Constructor</h2>
          </div>
          <div id='lowerCollective'>
            <div id='detailsInput'>
              <For each={inputCount()}>{(input, index) =>
                <InputDetails idd={index()+1} setInputCount={setInputCount()} setDetails={setDetails} details={details()} />
              }</For>
              <button onClick={handleAdd}>Add An Input</button>
              <button onClick={handleRemove}>Remove An Input</button>
              <br></br>
              <button id='submit' onClick={handleSubmit}>Submit</button>
              <Show when={dataSmallShow()} fallback={
                <>
                  <br></br>
                  <button onClick={() => setDataSmallShow(prev => !prev)}>Show</button>
                </>
              }>
                <br></br>
                <button onClick={() => setDataSmallShow(prev => !prev)}>Hide</button>
                <br></br>
                <textarea readonly id='data'>
                  {JSON.stringify(details(), null, 2)}
                </textarea>
              </Show>
            </div>
            <div id='generatedListOutput'>
              <textarea id='output'>
                {submitted().map((el) => {
                  return el+'\n';
                })}
              </textarea>
            </div>
          </div>
        </div>
      </Match>
      <Match when={newLayout() <= 650}>
      <div id='app' >
          <div id='header'>
            <h2>Email Constructor</h2>
          </div>
          <div id='lowerCollective'>
            <div id='detailsInput'>
              <For each={inputCount()}>{(input, index) =>
                <InputDetails idd={index()+1} setInputCount={setInputCount()} setDetails={setDetails} details={details()} />
              }</For>
              <button onClick={handleAdd}>Add An Input</button>
              <button onClick={handleRemove}>Remove An Input</button>
              <br></br>
              <button id='submit' onClick={handleSubmit}>Submit</button>
            </div>
            <div id='generatedListOutput'>
              <textarea id='output'>
                {submitted().map((el) => {
                  return el+'\n';
                })}
              </textarea>
            </div>
          </div>
        </div>
      </Match>
    </Switch>
  );
}


function InputDetails(props) {
  const handleFirstNameChange = (e) => {
    const preChange = {...props.details};
    preChange[props.idd]['firstname'] = e;
    props.setDetails(preChange);
  }

  const handleLastNameChange = (e) => {
    const preChange = {...props.details};
    preChange[props.idd]['lastname'] = e;
    props.setDetails(preChange);
  }

  const handleWebsiteChange = (e) => {
    const preChange = {...props.details};
    preChange[props.idd]['website'] = e;
    props.setDetails(preChange);
  }

  return (
    <div class='individualInput' id={props.idd}>
      <span>
        <label>First Name:  </label>
        <input onChange={(e) => handleFirstNameChange(e.currentTarget.value)} type='text' />
      </span>
      <br></br>
      <span>
        <label>Last Name:  </label>
        <input onChange={(e) => handleLastNameChange(e.currentTarget.value)} type='text' />
      </span>
      <br></br>
      <span>
        <label>Company Website:  </label>
        <input onChange={(e) => handleWebsiteChange(e.currentTarget.value)} type='text' />
      </span>
    </div>
  )
}