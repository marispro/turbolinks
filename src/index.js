if (typeof window.livewire === 'undefined') {
    throw 'Livewire Turbolinks Plugin: window.Livewire is undefined. Make sure @livewireScripts is placed above this script include'
}

var firstTime = true;
document.addEventListener("turbolinks:load", function() {
    /* We only want this handler to run AFTER the first load. */
    if  (firstTime) {
        firstTime = false;
        return;
    }

    window.Livewire.restart();
});

document.addEventListener("turbolinks:before-cache", function() {
    document.querySelectorAll('[wire\\:id]').forEach(function(el) {
        const component = el.__livewire;
        const dataObject = {
            fingerprint: component.fingerprint,
            serverMemo: component.serverMemo,
            effects: component.effects,
        };
        el.setAttribute('wire:initial-data', JSON.stringify(dataObject));
    });
});