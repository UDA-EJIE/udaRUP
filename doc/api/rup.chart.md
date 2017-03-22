<a name="module_rup_chart"></a>

## rup_chart
Herramientas para mostrar gráficas atractivas para mostrarinformacón al usuario de forma atractiva.

**Summary**: Componente RUP Chart.  
**See**: El componente está basado en el plugin [Chart.js](http://www.chartjs.org/). Para mas información acerca de las funcionalidades y opciones de configuración pinche [aquí](http://www.chartjs.org/docs/).  

* [rup_chart](#module_rup_chart)
    * [~destroy()](#module_rup_chart..destroy)
    * [~updateData(param)](#module_rup_chart..updateData)
    * [~updateLabels(param)](#module_rup_chart..updateLabels)
    * [~updateDatasets(param)](#module_rup_chart..updateDatasets)
    * [~getDatasets()](#module_rup_chart..getDatasets) ⇒ <code>object</code>
    * [~getLabels()](#module_rup_chart..getLabels) ⇒ <code>object</code>
    * [~getData()](#module_rup_chart..getData) ⇒ <code>object</code>
    * [~getChart()](#module_rup_chart..getChart) ⇒ <code>object</code>
    * [~toBase64Image()](#module_rup_chart..toBase64Image) ⇒ <code>object</code>

<a name="module_rup_chart..destroy"></a>

### rup_chart~destroy()
Destruye la instancia del grafico creado, limpia cualquier referencia almacenada del componente. Debe ser utilizado antes de usar el canvas para un nuevo gráfico]

**Kind**: inner method of <code>[rup_chart](#module_rup_chart)</code>  
<a name="module_rup_chart..updateData"></a>

### rup_chart~updateData(param)
Método utilizado para actualizar los datos de los gráficos en caliente, tanto los labels como los datos numéricos

**Kind**: inner method of <code>[rup_chart](#module_rup_chart)</code>  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>Object</code> | Estructura de datos de rup_chart |
| param.datasets | <code>array</code> | Valores númericos a representar en el gráfico |
| param.labels | <code>array</code> | Etiquetas de literales asociados al dataset de datos |

<a name="module_rup_chart..updateLabels"></a>

### rup_chart~updateLabels(param)
Método que actualiza los labels asociados a los datos

**Kind**: inner method of <code>[rup_chart](#module_rup_chart)</code>  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>array</code> | Los labels a actualizar |

<a name="module_rup_chart..updateDatasets"></a>

### rup_chart~updateDatasets(param)
Método que actualiza los datasets con los valores numéricos a representar por el gráfico

**Kind**: inner method of <code>[rup_chart](#module_rup_chart)</code>  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>array</code> | Los datasets a actualizar |

<a name="module_rup_chart..getDatasets"></a>

### rup_chart~getDatasets() ⇒ <code>object</code>
Método que devuelve los datasets de datos del gráfico

**Kind**: inner method of <code>[rup_chart](#module_rup_chart)</code>  
**Returns**: <code>object</code> - - El conjunto de datasets de datos del componente  
<a name="module_rup_chart..getLabels"></a>

### rup_chart~getLabels() ⇒ <code>object</code>
Método que devuelve los labels asociados a los datasets del gráfico

**Kind**: inner method of <code>[rup_chart](#module_rup_chart)</code>  
**Returns**: <code>object</code> - - El conjunto de labels del componente  
<a name="module_rup_chart..getData"></a>

### rup_chart~getData() ⇒ <code>object</code>
Método que devuelve la estructura de datos de datasets y labels que definen el gráfico

**Kind**: inner method of <code>[rup_chart](#module_rup_chart)</code>  
**Returns**: <code>object</code> - - [El conjunto de datos del componente]  
<a name="module_rup_chart..getChart"></a>

### rup_chart~getChart() ⇒ <code>object</code>
Devuelve la instancia del objeto chart.js

**Kind**: inner method of <code>[rup_chart](#module_rup_chart)</code>  
**Returns**: <code>object</code> - - la instancia del objecto  
<a name="module_rup_chart..toBase64Image"></a>

### rup_chart~toBase64Image() ⇒ <code>object</code>
Devuelve el grafico en un string base64

**Kind**: inner method of <code>[rup_chart](#module_rup_chart)</code>  
**Returns**: <code>object</code> - -  string en base64 del gráfico  
