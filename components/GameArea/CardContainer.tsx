import React from 'react'
import Card from './Card'

interface CardContainerProps {
    cards: Array<any>
    onCardClick: (text: string) => any
    type?: string
    blackCard?: string
}

interface JudgingCardsContainer {
    blackCard: string
    cardsToJudge: Array<any>
    onCardClick: (text: string, user: string) => any
}

const CardContainer: React.FC<CardContainerProps> = ({
    cards, onCardClick, blackCard
}: CardContainerProps) => {
    if (!cards) return null
    const handleCardClick = (cardText: string): any => {
        if (!onCardClick) return;
        onCardClick(cardText)
    }
    return (
        <>
            {blackCard && (<Card text={blackCard} type="black" backSide={false} />)}
            {cards.map((card) => (
                <Card
                    key={card.cardName}
                    type={'white'}
                    text={card.cardName}
                    backSide={false}
                    handleClick={() => handleCardClick(card.cardName)}
                />
            ))}
        </>
    )
}

const JudgingCardsContainer: React.FunctionComponent<JudgingCardsContainer> = ({ cardsToJudge, onCardClick, blackCard }: JudgingCardsContainer) => {
    if (!cardsToJudge) return null
    const handleCardClick = (cardText: string, user: string): any => {
        if (!onCardClick) return;
        onCardClick(cardText, user)
    }
    return (
        <>
            {blackCard && (<Card text={blackCard} type="black" backSide={false} />)}
            {cardsToJudge.map((card) => (
                <Card
                    key={card.cardName}
                    type={'white'}
                    text={card.cardName}
                    backSide={false}
                    handleClick={() => handleCardClick(card.cardName, card.name)}
                />
            ))}
        </>
    )
}
export { JudgingCardsContainer, CardContainer }
