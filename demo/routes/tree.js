exports.json = function(req, res) {
    var json = [
        {
            data: 'Padre1',
            attr:{id:'node1'},
            children: [
                {data:'Hijo1', attr:{id:'node11'}},
                {data:'Hijo2', attr:{id:'node12'}},
            ]
        }
    ];
    res.status(200).json(json);
  };

  exports.xml = function(req, res) {
      var xml = '<root>\
                    <item id="node1">\
                        <content><name><![CDATA[Padre]]></name></content>\
                        <item id="node11" parent_id="node1">\
                            <content><name><![CDATA[Hijo 2]]></name></content>\
                        </item>\
                        <item id="node12" parent_id="node1">\
                            <content><name><![CDATA[Hijo 1]]></name></content>\
                        </item>\
                    </item>\
                </root>';
      res.status(200).header('Content-Type', 'text/xml').send(xml);
  }