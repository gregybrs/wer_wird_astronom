<script lang="ts">
    export let show = false;
    export let message = "";
    export let onClose = () => {};

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            onClose();
        }
    }
</script>

{#if show}
    <div class="modal-overlay" role="dialog" aria-modal="true">
        <button class="modal" tabindex="0" on:keydown={handleKeydown}>
            <p>{message}</p>
            <button type="button" on:click={onClose}>Schließen</button>
        </button>
    </div>
{/if}

<style>
    .modal-overlay {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        background-color: #4949473b;
        backdrop-filter: blur(2px);
        width: 100%;
        height: 100%;
    }
    .modal {
        background: rgba(193, 229, 237, 0.773);
        color: black;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        font-size: 16px;
        width: 300px;
        height: 300px;
        outline: 3px solid #ffdd57;
        backdrop-filter: blur(5px);
    }
    .modal button {
        margin-top: 20px;
        padding: 10px 20px;
        border: none;
        background: #007bff;
        color: white;
        border-radius: 5px;
        cursor: pointer;
        height: 50px;
        width: 200px;
    }

    .modal button:hover {
        background: #0056b3;
    }
    .modal:hover {
        background: rgba(193, 229, 237, 0.773);
    }
</style>
