defmodule TestLiveViewWeb.TestLive.Index do
  use Phoenix.LiveView

  def render(assigns) do
    TestLiveViewWeb.TestLiveView.render("index.html", assigns)
  end

  def mount(_, _, socket) do
    {:ok, assign(socket, state: "CLOSED", action: nil, connected: connected?(socket))}
  end

  def handle_event("open-modal", %{"id" => id}, socket) do
    send_update TestLiveViewWeb.Common.Modal, id: id, state: "OPEN"
    {:noreply, socket}
  end

  def handle_event("close-modal", %{"id" => id}, socket) do
    :timer.sleep(300) # SO THE CSS ANIMATIONS HAVE TIME TO RUN
    send_update TestLiveViewWeb.Common.Modal, id: id, state: "CLOSED", action: nil
    {:noreply, socket}
  end
end
