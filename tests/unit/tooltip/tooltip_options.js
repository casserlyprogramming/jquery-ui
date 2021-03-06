(function( $ ) {

module( "tooltip: options" );

test( "content: default", function() {
	var element = $( "#tooltipped1" ).tooltip().tooltip( "open" );
	deepEqual( $( "#" + element.attr( "aria-describedby" ) ).text(), "anchortitle" );
});

test( "content: return string", function() {
	var element = $( "#tooltipped1" ).tooltip({
		content: function() {
			return "customstring";
		}
	}).tooltip( "open" );
	deepEqual( $( "#" + element.attr( "aria-describedby" ) ).text(), "customstring" );
});

test( "content: return jQuery", function() {
	var element = $( "#tooltipped1" ).tooltip({
		content: function() {
			return $( "<div>" ).html( "cu<b>s</b>tomstring" );
		}
	}).tooltip( "open" );
	deepEqual( $( "#" + element.attr( "aria-describedby" ) ).text(), "customstring" );
});

asyncTest( "content: sync + async callback", function() {
	expect( 2 );
	var element = $( "#tooltipped1" ).tooltip({
		content: function( response ) {
			setTimeout(function() {
				deepEqual( $( "#" + element.attr("aria-describedby") ).text(), "loading..." );

				response( "customstring2" );
				setTimeout(function() {
					deepEqual( $( "#" + element.attr("aria-describedby") ).text(), "customstring2" );
					start();
				}, 13 );
			}, 13 );
			return "loading...";
		}
	}).tooltip( "open" );
});

test( "items", function() {
	expect( 2 );
	var event,
		element = $( "#qunit-fixture" ).tooltip({
			items: "#fixture-span"
		});

	event = $.Event( "mouseenter" );
	event.target = $( "#fixture-span" )[ 0 ];
	element.tooltip( "open", event );
	deepEqual( $( "#" + $( "#fixture-span" ).attr( "aria-describedby" ) ).text(), "title-text" );

	// make sure default [title] doesn't get used
	event.target = $( "#tooltipped1" )[ 0 ];
	element.tooltip( "open", event );
	deepEqual( $( "#tooltipped1" ).attr( "aria-describedby" ), undefined );

	element.tooltip( "destroy" );
});

test( "tooltipClass", function() {
	expect( 1 );
	var element = $( "#tooltipped1" ).tooltip({
		tooltipClass: "custom"
	}).tooltip( "open" );
	ok( $( "#" + element.attr( "aria-describedby" ) ).hasClass( "custom" ) );
});

}( jQuery ) );
