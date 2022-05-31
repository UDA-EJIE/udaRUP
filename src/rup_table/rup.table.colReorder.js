/**
 * Módulo que permite a los usuarios mover dinámicamente las columnas de las tablas.
 * 
 * @summary     Extensión del componente ColReorder
 * @version     1.0.0
 * @file        rup.table.colReorder.js
 * @license
 * Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);
 * Solo podrá usarse esta obra si se respeta la Licencia.
 * Puede obtenerse una copia de la Licencia en
 *
 *      http://ec.europa.eu/idabc/eupl.html
 *
 * Salvo cuando lo exija la legislación aplicable o se acuerde por escrito,
 * el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,
 * SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.
 * Véase la Licencia en el idioma concreto que rige los permisos y limitaciones
 * que establece la Licencia.
 * @copyright   Copyright 2022 E.J.I.E., S.A.
 */
(function( factory ){
    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( ['jquery', 'datatables.net', 'datatables.net-bs4', 'datatables.net-colreorder', 'datatables.net-colreorder-bs4'], function ( $ ) {
            return factory( $, window, document );
        } );
    }
    else if ( typeof exports === 'object' ) {
        // CommonJS
        module.exports = function (root, $) {
            if ( ! root ) {
                root = window;
            }

            if ( ! $ || ! $.fn.dataTable ) {
                $ = require('datatables.net')(root, $).$;
            }

            return factory( $, root, root.document );
        };
    }
    else {
        // Browser
        factory( jQuery, window, document );
    }
}(function($) {
    'use strict';
    
    /**
     * Switch the key value pairing of an index array to be value key (i.e. the old value is now the
     * key). For example consider [ 2, 0, 1 ] this would be returned as [ 1, 2, 0 ].
     *  @method  fnInvertKeyValues
     *  @param   array aIn Array to switch around
     *  @returns array
     */
    function fnInvertKeyValues( aIn )
    {
    	var aRet=[];
    	for ( var i=0, iLen=aIn.length ; i<iLen ; i++ )
    	{
    		aRet[ aIn[i] ] = i;
    	}
    	return aRet;
    }


    /**
     * Modify an array by switching the position of two elements
     *  @method  fnArraySwitch
     *  @param   array aArray Array to consider, will be modified by reference (i.e. no return)
     *  @param   int iFrom From point
     *  @param   int iTo Insert point
     *  @returns void
     */
    function fnArraySwitch( aArray, iFrom, iTo )
    {
    	var mStore = aArray.splice( iFrom, 1 )[0];
    	aArray.splice( iTo, 0, mStore );
    }


    /**
     * Switch the positions of nodes in a parent node (note this is specifically designed for
     * table rows). Note this function considers all element nodes under the parent!
     *  @method  fnDomSwitch
     *  @param   string sTag Tag to consider
     *  @param   int iFrom Element to move
     *  @param   int Point to element the element to (before this point), can be null for append
     *  @returns void
     */
    function fnDomSwitch( nParent, iFrom, iTo )
    {
    	var anTags = [];
    	for ( var i=0, iLen=nParent.childNodes.length ; i<iLen ; i++ )
    	{
    		if ( nParent.childNodes[i].nodeType == 1 )
    		{
    			anTags.push( nParent.childNodes[i] );
    		}
    	}
    	var nStore = anTags[ iFrom ];

    	if ( iTo !== null )
    	{
    		nParent.insertBefore( nStore, anTags[iTo] );
    	}
    	else
    	{
    		nParent.appendChild( nStore );
    	}
    }


    /**
     * Plug-in for DataTables which will reorder the internal column structure by taking the column
     * from one position (iFrom) and insert it into a given point (iTo).
     *  @method  $.fn.dataTableExt.oApi.fnColReorder
     *  @param   object oSettings DataTables settings object - automatically added by DataTables!
     *  @param   int iFrom Take the column to be repositioned from this point
     *  @param   int iTo and insert it into this point
     *  @param   bool drop Indicate if the reorder is the final one (i.e. a drop)
     *    not a live reorder
     *  @param   bool invalidateRows speeds up processing if false passed
     *  @returns void
     */
    $.fn.dataTableExt.oApi.fnColReorder = function ( oSettings, iFrom, iTo, drop, invalidateRows )
    {
    	var i, iLen, j, jLen, jen, iCols=oSettings.aoColumns.length, nTrs, oCol;
    	var attrMap = function ( obj, prop, mapping ) {
    		if ( ! obj[ prop ] || typeof obj[ prop ] === 'function' ) {
    			return;
    		}

    		var a = obj[ prop ].split('.');
    		var num = a.shift();

    		if ( isNaN( num*1 ) ) {
    			return;
    		}

    		obj[ prop ] = mapping[ num*1 ]+'.'+a.join('.');
    	};

    	/* Sanity check in the input */
    	if ( iFrom == iTo )
    	{
    		/* Pointless reorder */
    		return;
    	}

    	if ( iFrom < 0 || iFrom >= iCols )
    	{
    		this.oApi._fnLog( oSettings, 1, "ColReorder 'from' index is out of bounds: "+iFrom );
    		return;
    	}

    	if ( iTo < 0 || iTo >= iCols )
    	{
    		this.oApi._fnLog( oSettings, 1, "ColReorder 'to' index is out of bounds: "+iTo );
    		return;
    	}

    	/*
    	 * Calculate the new column array index, so we have a mapping between the old and new
    	 */
    	var aiMapping = [];
    	for ( i=0, iLen=iCols ; i<iLen ; i++ )
    	{
    		aiMapping[i] = i;
    	}
    	fnArraySwitch( aiMapping, iFrom, iTo );
    	var aiInvertMapping = fnInvertKeyValues( aiMapping );


    	/*
    	 * Convert all internal indexing to the new column order indexes
    	 */
    	/* Sorting */
    	for ( i=0, iLen=oSettings.aaSorting.length ; i<iLen ; i++ )
    	{
    		oSettings.aaSorting[i][0] = aiInvertMapping[ oSettings.aaSorting[i][0] ];
    	}

    	/* Fixed sorting */
    	if ( oSettings.aaSortingFixed !== null )
    	{
    		for ( i=0, iLen=oSettings.aaSortingFixed.length ; i<iLen ; i++ )
    		{
    			oSettings.aaSortingFixed[i][0] = aiInvertMapping[ oSettings.aaSortingFixed[i][0] ];
    		}
    	}

    	/* Data column sorting (the column which the sort for a given column should take place on) */
    	for ( i=0, iLen=iCols ; i<iLen ; i++ )
    	{
    		oCol = oSettings.aoColumns[i];
    		for ( j=0, jLen=oCol.aDataSort.length ; j<jLen ; j++ )
    		{
    			oCol.aDataSort[j] = aiInvertMapping[ oCol.aDataSort[j] ];
    		}

    		// Update the column indexes
    		oCol.idx = aiInvertMapping[ oCol.idx ];
    	}

    	// Update 1.10 optimised sort class removal variable
    	$.each( oSettings.aLastSort, function (i, val) {
    		oSettings.aLastSort[i].src = aiInvertMapping[ val.src ];
    	} );

    	/* Update the Get and Set functions for each column */
    	for ( i=0, iLen=iCols ; i<iLen ; i++ )
    	{
    		oCol = oSettings.aoColumns[i];

    		if ( typeof oCol.mData == 'number' ) {
    			oCol.mData = aiInvertMapping[ oCol.mData ];
    		}
    		else if ( $.isPlainObject( oCol.mData ) ) {
    			// HTML5 data sourced
    			attrMap( oCol.mData, '_',      aiInvertMapping );
    			attrMap( oCol.mData, 'filter', aiInvertMapping );
    			attrMap( oCol.mData, 'sort',   aiInvertMapping );
    			attrMap( oCol.mData, 'type',   aiInvertMapping );
    		}
    	}

    	/*
    	 * Move the DOM elements
    	 */
    	if ( oSettings.aoColumns[iFrom].bVisible )
    	{
    		/* Calculate the current visible index and the point to insert the node before. The insert
    		 * before needs to take into account that there might not be an element to insert before,
    		 * in which case it will be null, and an appendChild should be used
    		 */
    		var iVisibleIndex = this.oApi._fnColumnIndexToVisible( oSettings, iFrom );
    		var iInsertBeforeIndex = null;

    		i = iTo < iFrom ? iTo : iTo + 1;
    		while ( iInsertBeforeIndex === null && i < iCols )
    		{
    			iInsertBeforeIndex = this.oApi._fnColumnIndexToVisible( oSettings, i );
    			i++;
    		}

    		/* Header */
    		nTrs = oSettings.nTHead.getElementsByTagName('tr');
    		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
    		{
    			fnDomSwitch( nTrs[i], iVisibleIndex, iInsertBeforeIndex );
    		}

    		/* Footer */
    		if ( oSettings.nTFoot !== null )
    		{
    			nTrs = oSettings.nTFoot.getElementsByTagName('tr');
    			/* Corrección para UDA. Se empieza siempre a partir del segundo tr que lleva el filtro
    			 * para evitar que el seeker haga fallar al módulo ColReorder.
    			 */
    			for ( i=1, iLen=nTrs.length ; i<iLen ; i++ )
    			{
    				fnDomSwitch( nTrs[i], iVisibleIndex, iInsertBeforeIndex );
    			}
    		}

    		/* Body */
    		for ( i=0, iLen=oSettings.aoData.length ; i<iLen ; i++ )
    		{
    			if ( oSettings.aoData[i].nTr !== null )
    			{
    				fnDomSwitch( oSettings.aoData[i].nTr, iVisibleIndex, iInsertBeforeIndex );
    			}
    		}
    	}

    	/*
    	 * Move the internal array elements
    	 */
    	/* Columns */
    	fnArraySwitch( oSettings.aoColumns, iFrom, iTo );

    	// regenerate the get / set functions
    	for ( i=0, iLen=iCols ; i<iLen ; i++ ) {
    		oSettings.oApi._fnColumnOptions( oSettings, i, {} );
    	}

    	/* Search columns */
    	fnArraySwitch( oSettings.aoPreSearchCols, iFrom, iTo );

    	/* Array array - internal data anodes cache */
    	for ( i=0, iLen=oSettings.aoData.length ; i<iLen ; i++ )
    	{
    		var data = oSettings.aoData[i];
    		var cells = data.anCells;

    		if ( cells ) {
    			fnArraySwitch( cells, iFrom, iTo );

    			// Longer term, should this be moved into the DataTables' invalidate
    			// methods?
    			for ( j=0, jen=cells.length ; j<jen ; j++ ) {
    				if ( cells[j] && cells[j]._DT_CellIndex ) {
    					cells[j]._DT_CellIndex.column = j;
    				}
    			}
    		}

    		// Swap around array sourced data (object based is left as is)
    		if ( Array.isArray( data._aData ) ) {
    			fnArraySwitch( data._aData, iFrom, iTo );
    		}
    	}

    	/* Reposition the header elements in the header layout array */
    	for ( i=0, iLen=oSettings.aoHeader.length ; i<iLen ; i++ )
    	{
    		fnArraySwitch( oSettings.aoHeader[i], iFrom, iTo );
    	}

    	if ( oSettings.aoFooter !== null )
    	{
    		for ( i=0, iLen=oSettings.aoFooter.length ; i<iLen ; i++ )
    		{
    			fnArraySwitch( oSettings.aoFooter[i], iFrom, iTo );
    		}
    	}

    	if ( invalidateRows || invalidateRows === undefined )
    	{
    		// Always read from the data object rather than reading back from the DOM
    		// since it could have been changed by a renderer
    		$.fn.dataTable.Api( oSettings ).rows().invalidate('data');
    	}

    	/*
    	 * Update DataTables' event handlers
    	 */

    	/* Sort listener */
    	for ( i=0, iLen=iCols ; i<iLen ; i++ )
    	{
    		$(oSettings.aoColumns[i].nTh).off('.DT');
    		this.oApi._fnSortAttachListener( oSettings, oSettings.aoColumns[i].nTh, i );
    	}


    	/* Fire an event so other plug-ins can update */
    	$(oSettings.oInstance).trigger( 'column-reorder.dt', [ oSettings, {
    		from: iFrom,
    		to: iTo,
    		mapping: aiInvertMapping,
    		drop: drop,

    		// Old style parameters for compatibility
    		iFrom: iFrom,
    		iTo: iTo,
    		aiInvertMapping: aiInvertMapping
    	} ] );
    };

}));
