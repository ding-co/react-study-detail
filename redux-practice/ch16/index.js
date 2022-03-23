import { createStore } from 'redux';

const $divToggle = document.querySelector('.toggle');
const $counter = document.querySelector('h1');
const $btnIncrease = document.querySelector('#increase');
const $btnDecrease = document.querySelector('#decrease');

// Action: 상태 변화 일으킴
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// Action Creator: 액션 객체를 만들어 내는 함수
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

// Initial State
const initialState = {
  toggle: false,
  counter: 0,
};

// Reducer: 변화를 일으키는 함수
function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state,
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}

// Store
const store = createStore(reducer);

const render = () => {
  const state = store.getState();
  if (state.toggle) {
    $divToggle.classList.add('active');
  } else {
    $divToggle.classList.remove('active');
  }
  $counter.innerText = state.counter;
};

render();
store.subscribe(render);

// Subscribe
// const listener = () => {
//   console.log('상태가 업데이트됨');
// };
// const unsubscribe = store.subscribe(listener);
// unsubscribe();

// Dispatch: 액션 발생시키기
$divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};
$btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};
$btnDecrease.onclick = () => {
  store.dispatch(decrease());
};
