

import FileExplorer from './compo/FileExplorer/FileExplorer'
import './utils.js/styles.css'

const App = () => {
  return (
    <div>
      <h1 className="p-4 bg-gray-800 text-white text-2xl font-bold ">File Explorer</h1>

      <div className="bg-gray-200 p-4" >
        <FileExplorer />
      </div>
    </div>





  )
}

export default App

