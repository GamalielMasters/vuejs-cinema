import {DirectiveOptions} from "vue/types/options";

const tooltip: DirectiveOptions = {
    bind( el, bindings ) {
        el.insertAdjacentHTML( 'beforeend', "<span class=\"tooltip\">Seats Available:" + bindings.value.seats + "</span>\n" );
        let tt = el.getElementsByClassName('tooltip')[0];
        el.addEventListener( 'mouseenter', () => { tt.classList.toggle("tooltip-show") } );
        el.addEventListener( 'mouseleave', () => { tt.classList.toggle("tooltip-show") } );
    }
};


export default tooltip;