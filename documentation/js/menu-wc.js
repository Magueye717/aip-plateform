'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">aipplatform documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-f9298bb7b628d389cc346133544717f0"' : 'data-target="#xs-components-links-module-AppModule-f9298bb7b628d389cc346133544717f0"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-f9298bb7b628d389cc346133544717f0"' : 'id="xs-components-links-module-AppModule-f9298bb7b628d389cc346133544717f0"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/PageNotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageNotFoundComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/ProjetModule.html" data-type="entity-link">ProjetModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ProjetModule-ac8a6a28c3a0e2eb81bfc99df4ea9cd6"' : 'data-target="#xs-components-links-module-ProjetModule-ac8a6a28c3a0e2eb81bfc99df4ea9cd6"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ProjetModule-ac8a6a28c3a0e2eb81bfc99df4ea9cd6"' : 'id="xs-components-links-module-ProjetModule-ac8a6a28c3a0e2eb81bfc99df4ea9cd6"' }>
                                        <li class="link">
                                            <a href="components/CreateProjetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateProjetComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DetailsProjetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailsProjetComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/EnteteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EnteteComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ListeProjetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListeProjetComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ProjetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjetComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ProjetRoutingModule.html" data-type="entity-link">ProjetRoutingModule</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/AddProjet.html" data-type="entity-link">AddProjet</a>
                    </li>
                    <li class="link">
                        <a href="classes/AddProjetError.html" data-type="entity-link">AddProjetError</a>
                    </li>
                    <li class="link">
                        <a href="classes/AddProjetSuccess.html" data-type="entity-link">AddProjetSuccess</a>
                    </li>
                    <li class="link">
                        <a href="classes/GetProjet.html" data-type="entity-link">GetProjet</a>
                    </li>
                    <li class="link">
                        <a href="classes/GetProjetError.html" data-type="entity-link">GetProjetError</a>
                    </li>
                    <li class="link">
                        <a href="classes/GetProjetSuccess.html" data-type="entity-link">GetProjetSuccess</a>
                    </li>
                    <li class="link">
                        <a href="classes/LoadProjets.html" data-type="entity-link">LoadProjets</a>
                    </li>
                    <li class="link">
                        <a href="classes/LoadProjetsError.html" data-type="entity-link">LoadProjetsError</a>
                    </li>
                    <li class="link">
                        <a href="classes/LoadProjetsSuccess.html" data-type="entity-link">LoadProjetsSuccess</a>
                    </li>
                    <li class="link">
                        <a href="classes/RemoveProjet.html" data-type="entity-link">RemoveProjet</a>
                    </li>
                    <li class="link">
                        <a href="classes/RemoveProjetError.html" data-type="entity-link">RemoveProjetError</a>
                    </li>
                    <li class="link">
                        <a href="classes/RemoveProjetSuccess.html" data-type="entity-link">RemoveProjetSuccess</a>
                    </li>
                    <li class="link">
                        <a href="classes/UpdateProjet.html" data-type="entity-link">UpdateProjet</a>
                    </li>
                    <li class="link">
                        <a href="classes/UpdateProjetError.html" data-type="entity-link">UpdateProjetError</a>
                    </li>
                    <li class="link">
                        <a href="classes/UpdateProjetSuccess.html" data-type="entity-link">UpdateProjetSuccess</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/AppEffects.html" data-type="entity-link">AppEffects</a>
                            </li>
                            <li class="link">
                                <a href="injectables/CountryService.html" data-type="entity-link">CountryService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ProjetService.html" data-type="entity-link">ProjetService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ProjetsEffects.html" data-type="entity-link">ProjetsEffects</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/Projet.html" data-type="entity-link">Projet</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-1.html" data-type="entity-link">State</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
            <li class="chapter">
                <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
            </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
