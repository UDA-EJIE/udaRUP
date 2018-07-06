exports.remote = function(req, res) {
    var json = [
        {
            data: 'Padre',
            children: ['Hijo 2', 'Hijo 1']
        }
    ]
  
    res.status(200).json(json);
  
  };