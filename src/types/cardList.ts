export default interface Card {
    id: number;
    name: string;
    imageUrl: string;
    cardName: string;
    cardType: string;
    cardColor: string;
    cardText: string;
    cardLevel: number;
    cardCost: number;
    cardGrowCost: number;
    cardLimit: number;
    cardLRIGType: string;
    cardTeamName: string;
    cardClass: string;
    cardPower: number;
    cardBurst: string;
    cardUseTime: string;
    isLRIGCenter: boolean;
    isLRIGSupport: boolean;
}