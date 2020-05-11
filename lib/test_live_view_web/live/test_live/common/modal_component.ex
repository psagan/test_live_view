defmodule TestLiveViewWeb.Common.Modal do
  use Phoenix.LiveComponent

  def render(assigns) do
    TestLiveViewWeb.CommonLiveView.render("modal_component.html", assigns)
  end

  def mount(socket) do
    {:ok, assign(socket, state: "OPEN", action: nil, connected: connected?(socket))}
  end
end
