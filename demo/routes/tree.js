exports.remote = function(req, res) {
    var json = [
        {
            data: 'Padre',
            children: ['Hijo 1', 'Hijo 2']
        }
    ]
  
    res.status(200).json(json);
  
  };