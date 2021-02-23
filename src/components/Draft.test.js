import { calculate } from './Draft'
test('Pick calculates correctly from draft order and rounds', async () => {
    expect(calculate({ draft_order: ["AAA", "BBB"], rounds: 0 })).toEqual([]);
    expect(calculate({ draft_order: [], rounds: 1 })).toEqual([]);
    expect(calculate({ draft_order: [], rounds: 2 })).toEqual([]);
    expect(calculate({ draft_order: ["AAA", "BBB"], rounds: 1 })).toEqual(["AAA", "BBB"]);
    expect(calculate({ draft_order: ["AAA", "BBB"], rounds: 2 })).toEqual(["AAA", "BBB", "AAA", "BBB"]);
    const res = calculate({ draft_order: ["AAA", "BBB"], rounds: 10 });
    expect(res).toEqual(["AAA", "BBB", "AAA", "BBB", "AAA", "BBB", "AAA", "BBB", "AAA", "BBB", "AAA", "BBB", "AAA", "BBB", "AAA", "BBB", "AAA", "BBB", "AAA", "BBB"]);
    expect(calculate({ draft_order: ["AAA", "BBB", "CCC"], rounds: 1 })).toEqual(["AAA", "BBB", "CCC"]);
    expect(calculate({ draft_order: ["AAA", "BBB", "CCC"], rounds: 2 })).toEqual(["AAA", "BBB", "CCC", "AAA", "BBB", "CCC"]);
    expect(calculate({ draft_order: ["AAA", "BBB", "CCC"], rounds: 3 })).toEqual(["AAA", "BBB", "CCC", "AAA", "BBB", "CCC", "AAA", "BBB", "CCC"]);
    expect(calculate({ draft_order: ["AAA", "BBB", "CCC", "DDD", "EEE", "FFF", "GGG", "HHH", "III", "JJJ"], rounds: 1 })).toEqual(["AAA", "BBB", "CCC", "DDD", "EEE", "FFF", "GGG", "HHH", "III", "JJJ"]);
    expect(calculate({ draft_order: ["AAA", "BBB", "CCC", "DDD", "EEE", "FFF", "GGG", "HHH", "III", "JJJ"], rounds: 2 })).toEqual(["AAA", "BBB", "CCC", "DDD", "EEE", "FFF", "GGG", "HHH", "III", "JJJ", "AAA", "BBB", "CCC", "DDD", "EEE", "FFF", "GGG", "HHH", "III", "JJJ"]);
})