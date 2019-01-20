import { LitElement, html, property, customElement } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';

const categoriesList = [
  { title: 'title1', name: 'name1', value: 'value1' },
  { titile: 'titile2', name: 'name2', value: 'value2' }
];

@customElement('cad-top-bar')
export class CadTopBar extends LitElement {
  @property({ type: String }) name = 'cad-top-bar';

  @property({ type: Boolean }) _drawerOpened = false;
  @property({ type: String }) _categoryName = '_categoryName';

  render() {
    return html`
      <style>
        :host {
          display: block;

          color: var(--text-color);
        }

        app-header,
        app-toolbar {
          height: 48px;
        }

        app-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1;
          background-color: var(--background-color);
          /* background-color: rgba(255, 255, 255, 0.95); */
          --app-header-shadow: {
            box-shadow: inset 0px 5px 6px -3px rgba(0, 0, 0, 0.2);
            height: 10px;
            bottom: -10px;
          }
        }

        app-toolbar {
          display: flex;
          justify-content: space-between;
        }

        paper-icon-button {
          color: var(--app-primary-color);
        }

        paper-button {
          text-transform: unset;
          height: 40px;
          padding: 0 0.5rem;
          font-size: var(--font-small);
        }

        iron-icon {
          margin-right: 0.25rem;
        }

        app-drawer {
          z-index: 3;
        }

        .drawer-list {
          margin: 20px 0;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          line-height: 40px;
          text-decoration: none;
          color: var(--app-secondary-color);
        }

        .drawer-list a.active {
          color: black;
          font-weight: bold;
        }
      </style>

      <app-header role="navigation" id="header" effects="waterfall" condenses reveals>
        <app-toolbar>
          <div>
            <paper-button><iron-icon icon="menu"></iron-icon>Menu</paper-button>
          </div>
          <div>
            <paper-button><iron-icon icon="add"></iron-icon>Add</paper-button>
            <paper-button><iron-icon icon="play_arrow"></iron-icon>Play</paper-button>
          </div>
          <div>
            <paper-button><iron-icon icon="account_circle"></iron-icon>Account</paper-button>
          </div>
          <paper-progress value="10" indeterminate bottom-item></paper-progress>
        </app-toolbar>
      </app-header>

      <app-drawer .opened="${this._drawerOpened}" tabindex="0" @opened-changed="${this._drawerOpenedChanged}">
        <nav class="drawer-list">
          ${
            repeat(categoriesList, category => {
              const cssClass = category.name === this._categoryName ? 'active' : '';
              return html`
                <a class="${cssClass}" href="/list/${category.name}"> ${category.title} </a>
              `;
            })
          }
        </nav>
      </app-drawer>
    `;
  }

  _menuButtonClicked() {
    console.log('_menuButtonClicked');
    this._drawerOpened = !this._drawerOpened;
  }

  _drawerOpenedChanged() {
    console.log('_menuButtonClicked');
  }
}
