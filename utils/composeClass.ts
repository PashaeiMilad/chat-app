export const composeClass = (name:string,type:string,size:string,...args:Array<string>)=>{
  let composedClass = `${name}_${type}_${size}`;
  if(args.length){
    args.forEach(argument=>{
      composedClass += `-${argument}`
    })
  }
  return composedClass;
}