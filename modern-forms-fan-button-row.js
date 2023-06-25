import {
	LitElement,
	html,
	css,
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

class ModernFormsFanButtonRow extends LitElement {

	// These values are the 6 speed/percentages for the ModernForms Fans
	// They are fixed values for this fan, they cannot be changed.
	static get speed0Percent() { return 'off'; }
	static get speed1Percent() { return 16; }
	static get speed2Percent() { return 33; }
	static get speed3Percent() { return 50; }
	static get speed4Percent() { return 66; }
	static get speed5Percent() { return 83; }
	static get speed6Percent() { return 100; }

	static get properties() {
		return {
			hass: undefined,
			config: undefined,
			speed0Active: Boolean,
			speed1Active: Boolean,
			speed2Active: Boolean,
			speed3Active: Boolean,
			speed4Active: Boolean,
			speed5Active: Boolean,
			speed6Active: Boolean,
			speed0CurrentColor: String,
			speed1CurrentColor: String,
			speed2CurrentColor: String,
			speed3CurrentColor: String,
			speed4CurrentColor: String,
			speed5CurrentColor: String,
			speed6CurrentColor: String
		};
	}

	static get styles() {
		return css`
			:host {
				line-height: inherit;
			}
			.fanButtonBox {
				display: flex;
				flex-direction: row;
			}
			.fanSpeedButton {
				min-width: 30px;
				max-width: 30px;
				height: 30px;
				margin-left: 2px;
				margin-right: 2px;
				background-color: #759aaa;
				border: 1px solid lightgrey;
				border-radius: 4px;
				font-size: 10px !important;
				color: inherit;
				text-align: center;
				float: left !important;
				padding: 1px;
				cursor: pointer;
			}
		`;
	}

	render() {
		return html `
			<hui-generic-entity-row .hass="${this.hass}" .config="${this.config}">
				<div id="button-container" class="fanButtonBox" @click=${this.stopPropagation}>
					<button
						class="fanSpeedButton"
						style="background-color:${this.speed0CurrentColor}"
						@click=${this.setSpeed0}
						?disabled="${this.speed0Active}">
						<span>Off</span>
					</button>
					<button
						class="fanSpeedButton"
						style="background-color:${this.speed1CurrentColor}"
						@click=${this.setSpeed1}
						?disabled="${this.speed1Active}">
						<span>1</span>
					</button>
					<button
						class="fanSpeedButton"
						style="background-color:${this.speed2CurrentColor}"
						@click=${this.setSpeed2}
						?disabled="${this.speed2Active}">
						<span>2</span>
					</button>
					<button
						class="fanSpeedButton"
						style="background-color:${this.speed3CurrentColor}"
						@click=${this.setSpeed3}
						?disabled="${this.speed3Active}">
						<span>3</span>
					</button>
					<button
						class="fanSpeedButton"
						style="background-color:${this.speed4CurrentColor}"
						@click=${this.setSpeed4}
						?disabled="${this.speed4Active}">
						<span>4</span>
					</button>
					<button
						class="fanSpeedButton"
						style="background-color:${this.speed5CurrentColor}"
						@click=${this.setSpeed5}
						?disabled="${this.speed5Active}">
						<span>5</span>
					</button>
					<button
						class="fanSpeedButton"
						style="background-color:${this.speed6CurrentColor}"
						@click=${this.setSpeed6}
						?disabled="${this.speed6Active}">
						<span>6</span>
					</button>
				</div>
			</hui-generic-entity-row>
		`;
	}

	stopPropagation(e) {
		e.stopPropagation();
	}

	setConfig(config) {
		if (!config) {
			throw new Error("Invalid configuration");
		}
		this.config = config;
	}

	updated(changedProperties) {
		if (changedProperties.has("hass")) {
			this.hassChanged();
		}
	}

	hassChanged() {
		let speed0Active = false;
		let speed1Active = false;
		let speed2Active = false;
		let speed3Active = false;
		let speed4Active = false;
		let speed5Active = false;
		let speed6Active = false;
		let speed0CurrentColor = 'var(--disabled-text-color)';
		let speed1CurrentColor = 'var(--disabled-text-color)';
		let speed2CurrentColor = 'var(--disabled-text-color)';
		let speed3CurrentColor = 'var(--disabled-text-color)';
		let speed4CurrentColor = 'var(--disabled-text-color)';
		let speed5CurrentColor = 'var(--disabled-text-color)';
		let speed6CurrentColor = 'var(--disabled-text-color)';

		const config = this.config;
		const stateObj = this.hass.states[config.entity];

		if (!stateObj) {
			//Do nothing
		} else if (stateObj.state === 'off') {
			speed0Active = true;
			speed0CurrentColor = 'var(--primary-color)';
		} else if (stateObj.state === 'on' && stateObj.attributes) {
			switch (stateObj.attributes.percentage) {
				case ModernFormsFanButtonRow.speed1Percent:
					speed1Active = true;
					speed1CurrentColor = 'var(--primary-color)';
					break;
				case ModernFormsFanButtonRow.speed2Percent:
					speed2Active = true;
					speed2CurrentColor = 'var(--primary-color)';
					break;
				case ModernFormsFanButtonRow.speed3Percent:
					speed3Active = true;
					speed3CurrentColor = 'var(--primary-color)';
					break;
				case ModernFormsFanButtonRow.speed4Percent:
					speed4Active = true;
					speed4CurrentColor = 'var(--primary-color)';
					break;
				case ModernFormsFanButtonRow.speed5Percent:
					speed5Active = true;
					speed5CurrentColor = 'var(--primary-color)';
					break;
				case ModernFormsFanButtonRow.speed6Percent:
					speed6Active = true;
					speed6CurrentColor = 'var(--primary-color)';
					break;
			}
		}

		this.speed0Active = speed0Active;
		this.speed1Active = speed1Active;
		this.speed2Active = speed2Active;
		this.speed3Active = speed3Active;
		this.speed4Active = speed4Active;
		this.speed5Active = speed5Active;
		this.speed6Active = speed6Active;
		this.speed0CurrentColor = speed0CurrentColor;
		this.speed1CurrentColor = speed1CurrentColor;
		this.speed2CurrentColor = speed2CurrentColor;
		this.speed3CurrentColor = speed3CurrentColor;
		this.speed4CurrentColor = speed4CurrentColor;
		this.speed5CurrentColor = speed5CurrentColor;
		this.speed6CurrentColor = speed6CurrentColor;
	}

	setSpeed0() { this.setSpeed(ModernFormsFanButtonRow.speed0Percent); }
	setSpeed1() { this.setSpeed(ModernFormsFanButtonRow.speed1Percent); }
	setSpeed2() { this.setSpeed(ModernFormsFanButtonRow.speed2Percent); }
	setSpeed3() { this.setSpeed(ModernFormsFanButtonRow.speed3Percent); }
	setSpeed4() { this.setSpeed(ModernFormsFanButtonRow.speed4Percent); }
	setSpeed5() { this.setSpeed(ModernFormsFanButtonRow.speed5Percent); }
	setSpeed6() { this.setSpeed(ModernFormsFanButtonRow.speed6Percent); }

	setSpeed(percent) {
		const param = {entity_id: this.config.entity};
		if ( percent == ModernFormsFanButtonRow.speed0Percent ) {
			this.hass.callService('fan', 'turn_off', param);
		} else {
			param.percentage = percent;
			this.hass.callService('fan', 'set_percentage', param);
		}
	}
}

customElements.define('modern-forms-fan-button-row', ModernFormsFanButtonRow);
