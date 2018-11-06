import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Directive({
    selector: '[whActiveMenu]'
})
export class ActiveMenuDirective implements OnInit {
    @Input() whActiveMenu: string;

    constructor(private el: ElementRef, private renderer: Renderer, private translateService: TranslateService) {}

    ngOnInit() {
        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.updateActiveFlag(event.lang);
        });
        this.updateActiveFlag(this.translateService.currentLang);
    }

    updateActiveFlag(selectedLanguage) {
        if (this.whActiveMenu === selectedLanguage) {
            this.renderer.setElementClass(this.el.nativeElement, 'active', true);
        } else {
            this.renderer.setElementClass(this.el.nativeElement, 'active', false);
        }
    }
}
