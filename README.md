# SaltyBot
A Userscript made to play SaltyBet autonomously.

This userscript works by observing fights and tracks simple stats (wins - losses) to determine winners. It's accuracy improves slowly with every fight. The bot might take a day or two of run time to start making real bets. This bot intentionally bets $1 on fights it doesn't know much about. This is intended as Salty Bet gives you XP per bet, not amount bet. Real bets are set to be fairly conservative (1% of total) by default so the bot doesn't bankrupt your account with a series of bad bets.

Some hacky things are being done like the use of cookies as storage. I need to get this working with an indexedDB or something more sustainable as Salty Bet has 6000+ known fighters.

So far this bot has been successful in taking my account from ~$1,000 to ~$280,000 in just a couple of weeks.
