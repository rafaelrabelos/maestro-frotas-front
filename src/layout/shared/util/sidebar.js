
  function buildSingleListItem(menuItem, key){
    const item = (
      <li key={key} className={menuItem.class}>
        <a href={menuItem.href}>
          <i
            className={`${menuItem.faIco} fa-lg fa-sidebar`}
            style={{ color: menuItem.color }}
          ></i>
          <span className="nav-text">{menuItem.name}</span>
        </a>
      </li>
    );

    return item;
  }

  function buildMenuItem(menuItem, key){
    if (menuItem.subItens.length < 1) {
      return buildSingleListItem(menuItem, `single-${key}`);
    }

    const itemMenu = (
      <div key={`${key}-colapse-container`}>
        <li key={`${key}-colapse-trigger`} className={menuItem.class}>
          <a
            href={menuItem.href}
            data-toggle={`collapse`}
            data-target={`#collapse-${key}`}
            aria-expanded="false"
            aria-controls={`collapse-${key}`}
          >
            <i
              className={`${menuItem.faIco} fa-lg fa-sidebar`}
              style={{ color: menuItem.color }}
            ></i>
            <span className="nav-text">{menuItem.name}</span>
          </a>
        </li>
        <div
          id={`collapse-${key}`}
          className="collapse"
          aria-labelledby={`heading-${key}`}
          data-parent="#style-1"
        >
          <ul key={`${key}-list-item`}>
            {menuItem.subItens.map((x, idx) =>
              buildSingleListItem(x, `${key}-child-${idx}`)
            )}
          </ul>
        </div>
      </div>
    );
    return itemMenu;
  }

  export default function buildSideNav(menuItemList, menuSubItemList){

    const groupables = menuItemList
      .filter((x) => x.group)
      .map((x, idx) => {
        x.subItens = menuSubItemList.filter(
          (y) => y.parentName === x.name
        );
        return buildMenuItem(x, `menu-g1-${idx.toString()}`);
      });

    const nonGroupables = menuItemList
      .filter((x) => !x.group)
      .map((x, idx) => {
        return buildSingleListItem(x, `menu-g2-${idx.toString()}`);
      });

    const sidenav = (
      <div className="sidenav">
        <nav className="main-menu">
          <div className="scrollbar" id="style-1">
            <ul key="groupable-sidevav">{groupables}</ul>
            <ul key="ungroupable-sidevav-">{nonGroupables}</ul>
          </div>
        </nav>
      </div>
    );

    return sidenav;
  }
