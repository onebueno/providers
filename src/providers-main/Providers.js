import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { show_alert } from '../functions'

const Providers = () => {
  //Colocar la URL donde se ejecuta el API!!
  const url = "https://localhost:44363/";
  const [providers, setProviders] = useState([]);
  const [id, setId] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [nombreComercial, setNombreComercial] = useState('');
  const [identificacionTributaria, setIdentificacionTributaria] = useState('');
  const [numeroTelefonico, setNumeroTelefonico] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [sitioWeb, setSitioWeb] = useState('');
  const [direccionFisica, setDireccionFisica] = useState('');
  const [pais, setPais] = useState('')
  const [facturacion, setFacturacion] = useState('');
  const [fechaModificacion, setFechaModificacion] = useState('');
  const [operation, setOperation] = useState('');
  const [title, setTitle] = useState('');

  useEffect( ()=>{
    getProviders();
    
  })

  const getProviders = async () => {
    const response = await axios.get(url);
    setProviders(response.data)
    
  };

  const openModal = (op,id,razonSocial,nombreComercial,identificacionTributaria,numeroTelefonico,correoElectronico,sitioWeb,direccionFisica,pais,facturacion) => {
    setId('');
    setRazonSocial('');
    setNombreComercial('');
    setIdentificacionTributaria('');
    setNumeroTelefonico('');
    setCorreoElectronico('');
    setSitioWeb('');
    setDireccionFisica('');
    setPais('');
    setFacturacion('');
    setOperation(op);

    if(op === 1){
      setTitle('Registrar Proveedor');
    }
    else if(op === 2){
      setTitle('Editar Proveedor');
      setId(id);
      setRazonSocial(razonSocial);
      setNombreComercial(nombreComercial);
      setIdentificacionTributaria(identificacionTributaria);
      setNumeroTelefonico(numeroTelefonico);
      setCorreoElectronico(correoElectronico);
      setSitioWeb(sitioWeb);
      setDireccionFisica(direccionFisica);
      setPais(pais);
      setFacturacion(facturacion);
      
    }
    window.setTimeout(function(){
      document.getElementById('txtRazonSocial').focus();
    },500)
  }

  const validation = () =>{
    var params;
    var metodo;

    var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var validPhone = /^9[\d]{9}$/;

    if(razonSocial.trim() === ''){
      show_alert('Debe ingresar la Razon Social del Proveedor','warning');
    }
    else if (nombreComercial.trim() === ''){
      show_alert('Debe ingresar el Nombre Comercial del Proveedor','warning');
    }
    else if (identificacionTributaria.trim() === ''){
      show_alert('Debe ingresar la identificacion tributaria del Proveedor','warning');
    }
    else if(identificacionTributaria.length > 11){
      show_alert('Debe la Identificacion Tributaria debe ser menor a 11 digitos','warning');
    }
    else if (numeroTelefonico.trim() === ''){
      show_alert('Debe ingresar el Numero telefonico del Proveedor','warning');
    }
    else if (validPhone.test(numeroTelefonico)){
      show_alert('Debe ingresar un numero telefonico valido','warning');
    }
    else if (correoElectronico.trim() === ''){
      show_alert('Debe ingresar el Correo electronico del Proveedor','warning');
    }
    else if (validEmail.test(correoElectronico)){
      show_alert('Debe ingresar un correo valido','warning');
    }
    else if(sitioWeb.trim() === ''){
      show_alert('Debe ingresar el Sitio Web del Proveedor','warning');
    }
    else if (sitioWeb.match(/www\.example\.com\/version\.php/i)){
      show_alert('Debe ingresar un sitio web valido','warning');
    }
    else if (direccionFisica.trim() === ''){
      show_alert('Debe ingresar la direccion fisica del Proveedor','warning');
    }
    else if (pais.trim() === ''){
      show_alert('Debe ingresar el Pais del Proveedor','warning');
    }
    else if(facturacion <= 0){
      show_alert('Debe ingresar la Facturacion del Proveedor','warning');
    }
    else{
      if(operation === 1){
        params = {razonSocial:razonSocial.trim(), nombreComercial: nombreComercial.trim(), identificacionTributaria:identificacionTributaria.trim(), numeroTelefonico: numeroTelefonico.trim(), correoElectronico:correoElectronico.trim(), sitioWeb:sitioWeb.trim(), direccionFisica:direccionFisica.trim(), pais:pais.trim(), facturacion:parseFloat(facturacion)};
        metodo = 'POST';
      }
      else{
        getOffShoreLeaks();
        params = {id:id, idProveedor:id, razonSocial:razonSocial.trim(), nombreComercial: nombreComercial.trim(), identificacionTributaria:identificacionTributaria.trim(), numeroTelefonico: numeroTelefonico.trim(), correoElectronico:correoElectronico.trim(), sitioWeb:sitioWeb.trim(), direccionFisica:direccionFisica.trim(), pais:pais.trim(), facturacion:parseFloat(facturacion)};
        metodo = 'PUT';
      }
      enviarSolicitud(metodo,params);
    }
  }
  const enviarSolicitud = async(metodo,params) => {
    var APIurl = url
    if(metodo == 'PUT' || metodo == 'DELETE')
      APIurl = url + params.id

    await axios({ method:metodo, url: APIurl, data:params}).then(function(respuesta){
      console.log(respuesta)  
      
      var tipo =''
      var msj = ''
      if(respuesta.status == 200 && metodo == 'POST'){
          tipo = 'success'
          msj = 'Se registró con exito'
        }
      else if(respuesta.status == 200 && metodo == 'PUT'){
        tipo = 'success'
        msj = 'Se actualizó con exito'
      }
      else if(respuesta.status == 200 && metodo == 'DELETE'){
        tipo = 'success'
        msj = 'Se eliminó con exito'
      }
      else{
        tipo = 'error'
        msj = 'Error en la solicitud'
      }
    
      show_alert(msj,tipo);
      if(tipo === 'success'){
        document.getElementById('btnCerrar').click();
        getProviders();
      }
    })
    .catch(function(error){
      show_alert('Error en la solicitud','error')
      console.log(error);
    })
  }

  const deleteProvider = async (id, razonSocial) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Seguro que desea eliminar el proveedor ' + razonSocial + ' ?',
      icon: 'question', text:'No se podra revertir la acción',
      showCancelButton:true,confirmButtonText:'Si eliminar', cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        setId(id);
        enviarSolicitud('DELETE',{id:id});
      }
      else{
        show_alert('El proveedor no fue eliminado','info')
      }
    })
  }

  const getOffShoreLeaks = async() => {
    await axios.get('http://localhost:3001/api/offshoreleaks')
    .then(response => {
      // Manejar la respuesta
      console.log('Data:', response.data); // `response.data` contiene el cuerpo de la respuesta
    })
    .catch(error => {
      // Manejar errores
      console.error('Error:', error);
    });
  }

  const openModalScreening = (id,razonSocial,nombreComercial,identificacionTributaria,numeroTelefonico,correoElectronico,sitioWeb,direccionFisica,pais,facturacion) =>{
    setId(id);
    setRazonSocial(razonSocial);
    setNombreComercial(nombreComercial);
    setIdentificacionTributaria(identificacionTributaria);
    setNumeroTelefonico(numeroTelefonico);
    setCorreoElectronico(correoElectronico);
    setSitioWeb(sitioWeb);
    setDireccionFisica(direccionFisica);
    setPais(pais);
    setFacturacion(facturacion);

    var divContainer = document.getElementById('tableContainer').innerHTML = '';  
    
  }  

  const ScreeningOffShoreLeaks = async (parameters) => {
    var response = await axios.get('http://localhost:3001/api/offshoreleaks')

    var flag = false


    for(let i = 0; i < response.data.length; i++){
      for(let j = 1; j < response.data[i].hits; j++){
        if(response.data[i].investigation[j].entity == parameters.razonSocial || response.data[i].investigation[j].entity == parameters.nombreComercial){
          CrearTablaResultadoOffShoreLeaks(response.data[i].investigation[j].entity,response.data[i].investigation[j].jurisdiction,response.data[i].investigation[j].linkedto,response.data[i].investigation[j].dataFrom)
          flag = true
        
        }
      }
    }
    if(flag == false){
      show_alert('No se encontraron coincidencias','success');
    }
  }

  const CrearTablaResultadoOffShoreLeaks = async (entity,jurisdiction,linkedto,datafrom) => {
    show_alert('Se encontro una Coincidencia de ' + entity,'warning');
    var table = document.createElement('table');

    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.border = '1px solid #ccc';
    table.style.marginTop = '5px';

    var rowheader = table.insertRow();

    rowheader.style.border = '1px solid #ccc'

    var hcell1 = rowheader.insertCell(0);
    var hcell2 = rowheader.insertCell(1);
    var hcell3 = rowheader.insertCell(2);
    var hcell4 = rowheader.insertCell(3);

    hcell1.style.border = '1px solid #ccc'
    hcell2.style.border = '1px solid #ccc'
    hcell3.style.border = '1px solid #ccc'
    hcell4.style.border = '1px solid #ccc'

    hcell1.textContent = "Entity";
    hcell2.textContent = "Jurisdiction";
    hcell3.textContent = "Linked To";
    hcell4.textContent = "Data From";

    var row = table.insertRow();

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.style.border = '1px solid #ccc'
    cell2.style.border = '1px solid #ccc'
    cell3.style.border = '1px solid #ccc'
    cell4.style.border = '1px solid #ccc'

    cell1.textContent = entity;
    cell2.textContent = jurisdiction;
    cell3.textContent = linkedto;
    cell4.textContent = datafrom;


    var divContainer = document.getElementById('tableContainer');

    divContainer.appendChild(table);
  }

  const ScreeningTheWorldBank = async (parameters) => {
    var response = await axios.get('http://localhost:3001/api/worldbank')

    console.log(response)
    var flag = false

    for(let i = 0; i < response.data.hits; i++){
      if(response.data.debarredFirms[i].firmName == parameters.razonSocial || response.data.debarredFirms[i].firmName == parameters.nombreComercial){
        CrearTablaResultadoWorldBank(response.data.debarredFirms[i].firmName,response.data.debarredFirms[i].address,response.data.debarredFirms[i].country,response.data.debarredFirms[i].fromDate,response.data.debarredFirms[i].toDate,response.data.debarredFirms[i].grounds)
        flag= true;
      }
      
    }
    if(flag == false){
      show_alert('No se encontraron coincidencias','success');
    }
  }

  const CrearTablaResultadoWorldBank = async(firmName,address,country,fromDate,toDate,grounds) => {
    show_alert('Se encontro una Coincidencia de ' + firmName,'warning');
    var table = document.createElement('table');

    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.border = '1px solid #ccc';
    table.style.marginTop = '10px';

    var rowheader = table.insertRow();

    rowheader.style.border = '1px solid #ccc'

    var hcell1 = rowheader.insertCell(0);
    var hcell2 = rowheader.insertCell(1);
    var hcell3 = rowheader.insertCell(2);
    var hcell4 = rowheader.insertCell(3);
    var hcell5 = rowheader.insertCell(4);
    var hcell6 = rowheader.insertCell(5);

    hcell1.style.border = '1px solid #ccc'
    hcell2.style.border = '1px solid #ccc'
    hcell3.style.border = '1px solid #ccc'
    hcell4.style.border = '1px solid #ccc'
    hcell5.style.border = '1px solid #ccc'
    hcell6.style.border = '1px solid #ccc'

    hcell1.textContent = "firmName";
    hcell2.textContent = "address";
    hcell3.textContent = "country";
    hcell4.textContent = "fromDate";
    hcell5.textContent = "toDate";
    hcell6.textContent = "grounds";

    var row = table.insertRow();

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    cell1.style.border = '1px solid #ccc'
    cell2.style.border = '1px solid #ccc'
    cell3.style.border = '1px solid #ccc'
    cell4.style.border = '1px solid #ccc'
    cell5.style.border = '1px solid #ccc'
    cell6.style.border = '1px solid #ccc'

    cell1.textContent = firmName;
    cell2.textContent = address;
    cell3.textContent = country;
    cell4.textContent = fromDate;
    cell5.textContent = toDate;
    cell6.textContent = grounds;

    var divContainer = document.getElementById('tableContainer');

    divContainer.appendChild(table);
  }

  const ScreeningOFAC = async (parameters) => {
    var response = await axios.get('http://localhost:3001/api/ofac')


    var flag = false

    for(let i = 0; i < response.data.hits; i++){
      if(response.data.sanctions[i].name == parameters.razonSocial || response.data.sanctions[i].name == parameters.nombreComercial){
        CrearTablaResultadoOFAC(response.data.sanctions[i].address, response.data.sanctions[i].list, response.data.sanctions[i].name, response.data.sanctions[i].programs, response.data.sanctions[i].score, response.data.sanctions[i].type)
        flag = true;
      }
    }
    if(flag == false){
      show_alert('No se encontraron coincidencias','success');
    }
  }

  const CrearTablaResultadoOFAC = (address,list,name,programs,score,type) => {
    show_alert('Se encontro una Coincidencia de ' + name,'warning');
    var table = document.createElement('table');

    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.border = '1px solid #ccc';
    table.style.marginTop = '10px';

    var rowheader = table.insertRow();

    rowheader.style.border = '1px solid #ccc'

    var hcell1 = rowheader.insertCell(0);
    var hcell2 = rowheader.insertCell(1);
    var hcell3 = rowheader.insertCell(2);
    var hcell4 = rowheader.insertCell(3);
    var hcell5 = rowheader.insertCell(4);
    var hcell6 = rowheader.insertCell(5);

    hcell1.style.border = '1px solid #ccc'
    hcell2.style.border = '1px solid #ccc'
    hcell3.style.border = '1px solid #ccc'
    hcell4.style.border = '1px solid #ccc'
    hcell5.style.border = '1px solid #ccc'
    hcell6.style.border = '1px solid #ccc'

    hcell1.textContent = "address";
    hcell2.textContent = "list";
    hcell3.textContent = "name";
    hcell4.textContent = "programs";
    hcell5.textContent = "score";
    hcell6.textContent = "type";

    var row = table.insertRow();

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    cell1.style.border = '1px solid #ccc'
    cell2.style.border = '1px solid #ccc'
    cell3.style.border = '1px solid #ccc'
    cell4.style.border = '1px solid #ccc'
    cell5.style.border = '1px solid #ccc'
    cell6.style.border = '1px solid #ccc'

    cell1.textContent = address;
    cell2.textContent = list;
    cell3.textContent = name;
    cell4.textContent = programs;
    cell5.textContent = score;
    cell6.textContent = type;

    var divContainer = document.getElementById('tableContainer');

    divContainer.appendChild(table);
  }

  return (
    <div className='App'>
      <div className='container-fluid'>
      <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto'>
              <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProviders' onClick={() => openModal(1)}>
              <i className="bi bi-plus-circle"></i> Agregar
              </button>
              
            </div>
          </div>
        </div>

      <div className='row'>
        <div className='col-md-12'>
          <div className='table-responsive'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Razon Social</th>
                  <th>Nombre Comercial</th>
                  <th>Identificacion Tributaria</th>
                  <th>Numero Telefonico</th>
                  <th>Correo Electronico</th>
                  <th>Sitio Web</th>
                  <th>Direccion Fisica</th>
                  <th>Pais</th>
                  <th>Facturacion</th>
                  <th>Fecha Modificacion</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
                {
                  providers.map( (provider,i) => (
                    <tr key={provider.idProveedor}>
                      <td>{(i+1)}</td>
                      <td>{provider.razonSocial}</td>
                      <td>{provider.nombreComercial}</td>
                      <td>{provider.identificacionTributaria}</td>
                      <td>{provider.numeroTelefonico}</td>
                      <td>{provider.correoElectronico}</td>
                      <td><a href=  {provider.sitioWeb}>{provider.sitioWeb}</a></td>
                      <td>{provider.direccionFisica}</td>
                      <td>{provider.pais}</td>
                      <td>{provider.facturacion}</td>
                      <td>{provider.fechaModificacion}</td>
                      <td>
                        <button className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProviders' onClick={()=> openModal(2,provider.idProveedor,provider.razonSocial,provider.nombreComercial,provider.identificacionTributaria,provider.numeroTelefonico,provider.correoElectronico,provider.sitioWeb,provider.direccionFisica,provider.pais,provider.facturacion)} >
                          <i className='fa-solid fa-edit'></i>
                        </button>
                        &nbsp;
                        <button className='btn btn-danger' onClick={() => deleteProvider(provider.idProveedor,provider.razonSocial)}>
                          <i className='fa-solid fa-trash'></i>
                        </button>
                        &nbsp;
                        <button className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalScreening' onClick={() => openModalScreening(provider.idProveedor,provider.razonSocial,provider.nombreComercial,provider.identificacionTributaria,provider.numeroTelefonico,provider.correoElectronico,provider.sitioWeb,provider.direccionFisica,provider.pais,provider.facturacion)}>
                        <i className="fa-solid fa-paper-plane"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      </div>
      <div id='modalProviders' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
          <div className='modal-header'>
            <label className='h5'>{title}</label>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <input type='hidden' id='id'></input>
            <div className='input-group mb-3'>
              <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
              <input type='text' id='txtRazonSocial' className='form-control' placeholder='Razon Social' value={razonSocial}
              onChange={(e) => setRazonSocial(e.target.value)}></input>
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
              <input type='text' id='txtNombreComercial' className='form-control' placeholder='Nombre Comercial' value={nombreComercial}
              onChange={(e) => setNombreComercial(e.target.value)}></input>
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
              <input type='text' id='txtIdentificacionTributaria' className='form-control' placeholder='Identificacion Tributaria' value={identificacionTributaria}
              onChange={(e) => setIdentificacionTributaria(e.target.value)}></input>
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
              <input type='tel' id='txtNumeroTelefonico' className='form-control' placeholder='Numero telefonico' value={numeroTelefonico}
              onChange={(e) => setNumeroTelefonico(e.target.value)}></input>
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
              <input type='email' id='txtCorreoElectronico' className='form-control' placeholder='Correo electronico' value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}></input>
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
              <input type='url' id='txtSitioWeb' className='form-control' placeholder='Sitio Web' value={sitioWeb}
              onChange={(e) => setSitioWeb(e.target.value)}></input>
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
              <input type='text' id='txtDireccionFisica' className='form-control' placeholder='Direccion fisica' value={direccionFisica}
              onChange={(e) => setDireccionFisica(e.target.value)}></input>
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
              <select onChange={(e) => setPais(e.target.value)} value={pais} className='form-select' id='dllPais'>
                <option value='0' >SELECCIONE</option>
                <option value='Peru'>Peru</option>
                <option value='Chile'>Chile</option>
                <option value='Argentina'>Argentina</option>
                <option value='Colombia'>Colombia</option>
                <option value='Paraguay'>Paraguay</option>
              </select>
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
              <input type='text' id='txtFacturacion' className='form-control' placeholder='Facturacion' value={facturacion}
              onChange={(e) => setFacturacion(e.target.value)}></input>
            </div>
            <div className='d-grid col-6 mx-auto'>
              <button onClick={() => validation()} className='btn btn-success'>
                <i className='fa-solid fa-floppy-disk'></i> Guardar
              </button>
            </div>
          </div>
          <div className='modal-footer'>
            <button id='btnCerrar' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
          </div>
        </div>
        </div>
      </div>


      <div id='modalScreening' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog modal-xl'>
          <div className='modal-content'>
          <div className='modal-header'>
            <label className='h5'>Screening</label>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <input type='hidden' id='id'></input>

            <div className='row'>
              <div className='col'>
                <label>Razon Social:</label>
                <input className='form-control' id='inpRazonSocial' value={razonSocial} disabled></input>
              </div>
              <div className='col'>
              <label>Identificacion Tributaria:</label>
              <input className='form-control' id='inpIdentificacionTributaria' value={identificacionTributaria} disabled></input>
              </div>
              <div className='col'>
              <label>Nombre Comercial:</label>
              <input className='form-control' id='inpNombreComercial' value={nombreComercial} disabled></input>
              </div>
              <div className='col'>
              <label>Numero telefonico:</label>
              <input className='form-control' id='inpNumeroTelefonico' value={numeroTelefonico} disabled></input>
              </div>
              
            </div>
            <br></br>
            <div className='row'>
              <div className='col'>
              <label>Correo Electronico:</label>
              <input className='form-control' id='inpCorreoElectronico' value={correoElectronico} disabled></input>
              </div>
              <div className='col'>
              <label>Sitio Web:</label>
              <input className='form-control' id='inpSitioWeb' value={sitioWeb} disabled></input>
              </div>
              <div className='col'>
              <label>Direccion Fisica:</label>
              <input className='form-control' id='inpDireccionFisica' value={direccionFisica} disabled></input>
              </div>
              <div className='col'>
              <label>Pais:</label>
              <input className='form-control' id='inpPais' value={pais} disabled></input>
              </div>
            </div>
            <br></br>
            <div className='row'>
              <div className='col-md-3'>
              <label>Facturacion:</label>
              <input className='form-control' id='inpFacturacion' value={facturacion} disabled></input>
              </div>
            </div>
            <br></br>
            <div className='row'>
              <h3>Fuentes de Screening <i className="fa-solid fa-triangle-exclamation"></i></h3>
              <div className='col-md-2'>
                <button className='btn btn-dark' id='offshoreleaks' onClick={() => ScreeningOffShoreLeaks({razonSocial,nombreComercial})}>OffShoreLeaks</button>
              </div>
              <div className='col-md-2'>
                <button className='btn btn-dark' id='theworldbank' onClick={() => ScreeningTheWorldBank({razonSocial,nombreComercial})}>TheWorldBank</button>
              </div>
              <div className='col-md-2'>
                <button className='btn btn-dark' id='ofac' onClick={() => ScreeningOFAC({razonSocial,nombreComercial})}>OFAC</button>
              </div>
            </div>
            <div className='row'>
              <div id='tableContainer' className='table-responsive'>
                <br></br>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button id='btnCerrar' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
          </div>
        </div>
        </div>
      </div>

    </div>
  )
}

export default Providers