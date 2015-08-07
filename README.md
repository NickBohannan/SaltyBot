# SaltyBot
A Userscript made to play SaltyBet autonomously.

This userscript works by observing fights and tracks simple stats (wins - losses) to determine winners. It's accuracy improves slowly with every fight.

Some hacky things are being done like the use of cookies as storage. I need to get this working with an indexedDB or something more sustainable as Salty Bet has 6000+ fighters.

This bot intentionally bets $1 on fights it doesn't know much about this is intended as Salty Bet give you XP per bet, not amount. Bets are set to be fairly conservative (1% of total) by default so the bot doesn't bankrupt your account with a bad bet.

So far this bot has been successful taking my account from ~$1,000 to ~$280,000 in just a couple of weeks.
