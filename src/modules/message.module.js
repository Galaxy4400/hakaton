import { Module } from '../core/module';
import { random } from '../utils';

export class MessageModule extends Module {
	constructor() {
		super('message', 'Рандомный факт');

        this.messages = [
            'Нецензурная ругань снижает боль.',
            'Существует туманная радуга — блестящая белая дуга.',
            'Компания Баскин Робинс однажды сделала мороженое со вкусом кетчупа.',
            'Rio de Janeiro, буквальный перевод с португальского — январская река.',
            'Отпечатки пальцев коалы неотличимы от отпечатков пальца человека даже под электронным микроскопом.',
            'В Австралии больше кроликов, чем людей в Китае.',
            'На Кипре Деда Мороза зовут Василий.',
            'У морской звезды нет мозга.',
            'В Эфиопии школьникам запрещено есть соседа по парте.',
            'Электрический стул был изобретен стоматологом.'
        ]
	}

	trigger() {
        const numOfPhrases = this.messages.length;
        const phrase = this.messages[random(0, numOfPhrases - 1)];
        const phraseElement = document.createElement("p");
        phraseElement.className = "random-phrase-paragraph"
        phraseElement.innerText = phrase;
        document.querySelector("body").append(phraseElement);
        setTimeout(() => {
            phraseElement.remove();
        }, 5000)
	}
}