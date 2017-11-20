 const fetchReducer = (state={},action={})=>{
  let {type,pyload} = action;
  switch(type){
    case "FETCH_START":
      return Object.assign({},state,{status:'开始加载数据.....'})
    case "FETCH_END":
    console.log(pyload)
      return Object.assign({},state,{status:'数据加载完成.....',list:pyload});
    default:
      return state;
  }
}
export default fetchReducer;