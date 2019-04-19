// open lg (alt + f2 -> 'lg') and copypaste this shit

let getWindows = imports.ui.altTab.getWindows

imports.ui.altTab.WindowSwitcherPopup.prototype._getWindowList = function() {
  let workspace = null;

  if (this._settings.get_boolean('current-workspace-only')) {
    let workspaceManager = global.workspace_manager;

    workspace = workspaceManager.get_active_workspace();
  }

  return getWindows(workspace)
    .filter(w => w.get_monitor() === global.display.get_current_monitor());
}

imports.ui.windowManager.WindowManager.prototype.actionMoveWorkspace = function(workspace) {
  if (!Main.sessionMode.hasWorkspaces)
    return;

  let activeWorkspace = global.workspace_manager.get_active_workspace();

  if (activeWorkspace != workspace) {
    let currentWindow = global.display.focus_window;
    let allWindows = global.display.get_tab_list(Meta.TabList.NORMAL, workspace);
    let currentMonitor = global.display.get_current_monitor();
    allWindows = allWindows.filter(w => w.get_monitor() === currentMonitor);
    // print('----')
    // print(currentWindow.get_title());
    // print(allWindows.indexOf(currentWindow));
    // allWindows.forEach(w => print(w.get_title()));

    let windowToActivate =
          allWindows.indexOf(currentWindow) !== -1 ?
          currentWindow : allWindows[0];

    if (windowToActivate) //  && currentMonitor === global.display.get_primary_monitor()
      workspace.activate_with_focus(windowToActivate, global.get_current_time());
    else
      workspace.activate(global.get_current_time());
  }
};
