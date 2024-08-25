import {Circle} from "better-react-spinkit"

function Loading() {
    return(
        <centre style={{display:"grid", placeItems: "center", height: "100vh"}}>
           <div>
              <img
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/598px-WhatsApp_icon.png?20200503174721"
               alt=""
               style={{marjinBottom:10}}
               height={200}
               />
               <Circle color="#3CBC2B" size={60} />
           </div>

        </centre>
    )
}

export default Loading